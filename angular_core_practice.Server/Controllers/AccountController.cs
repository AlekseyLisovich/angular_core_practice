using angular_core_practice.Server.Models.ViewModels;
using angular_core_practice.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace angular_core_practice.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_userService.IsValidEmail(model.Email))
            {
                return BadRequest(new { message = "Invalid email address" });
            }

            if (!await _userService.IsEmailUniqueAsync(model.Email))
            {
                return BadRequest(new { message = "Email address is already taken" });
            }

            var user = await _userService.RegisterAsync(model);

            if (user == null)
            {
                return BadRequest(new { message = "Registration failed" });
            }

            return Ok(user);
        }
    }
}
