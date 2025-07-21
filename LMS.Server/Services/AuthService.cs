using LMS.Server.Data;
using LMS.Server.Interfaces;
using LMS.Server.Models;
using LMS.Server.DTOs.Auth;
using MongoDB.Driver;
using Org.BouncyCastle.Crypto.Generators;
using LMS.Server.DTOs;

namespace LMS.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly MongoContext _context;
        private readonly IJwtService _jwtService;

        public AuthService(MongoContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.Find(u => u.Email == request.Email).FirstOrDefaultAsync();

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            var token = _jwtService.GenerateToken(user);

            return new AuthResponse
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role
                    // Add any other necessary fields
                }
            };
        }


        public async Task<string> RegisterAsync(RegisterRequest dto)
        {
            var exists = await _context.Users.Find(x => x.Email == dto.Email).AnyAsync();
            if (exists) throw new Exception("User already exists.");

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role
            };
            await _context.Users.InsertOneAsync(user);
            return _jwtService.GenerateToken(user);
        }
    }

}
