using LMS.Server.Models;

namespace LMS.Server.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
