using angular_core_practice.Server.Entities;
using angular_core_practice.Server.Models.DTOs;
using angular_core_practice.Server.Models.ViewModels;
using angular_core_practice.Server.Repositories.Interfaces;
using angular_core_practice.Server.Services.Interfaces;

namespace angular_core_practice.Server.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<UserDTO> RegisterAsync(UserRegisterViewModel model)
        {
            var user = new User { Username = model.Username, Email = model.Email, Password = model.Password };
            user = await _userRepository.AddAsync(user);
            return new UserDTO { Id = user.Id, Username = user.Username, Email = user.Email };
        }

        public async Task<bool> IsEmailUniqueAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            return user == null;
        }

        public bool IsValidEmail(string email)
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
    }
}
