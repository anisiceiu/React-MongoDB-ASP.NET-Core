using LMS.Server.DTOs;
using LMS.Server.DTOs.Auth;

namespace LMS.Server.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequest dto);
        Task<AuthResponse> LoginAsync(LoginRequest dto);
    }
}
