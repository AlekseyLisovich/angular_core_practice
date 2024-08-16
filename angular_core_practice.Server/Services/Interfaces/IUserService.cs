using angular_core_practice.Server.Entities;
using angular_core_practice.Server.Models.DTOs;
using angular_core_practice.Server.Models.ViewModels;

namespace angular_core_practice.Server.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<UserDTO> RegisterAsync(UserRegisterViewModel model);
        Task<bool> IsEmailUniqueAsync(string email);
        bool IsValidEmail(string email);
    }
}
