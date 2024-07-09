using AlertManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AlertManager.DTO;
using AlertManager.Repositories;

namespace AlertManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly UserRepository _userRepository;
        public LoginController(IConfiguration config, UserRepository userRepository)
        {
            _config = config;
            _userRepository = userRepository;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] UserLoginDto userLogin)
        {
            var user = await Authenticate(userLogin.Username, userLogin.Password);

            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }
            return NotFound("user not found");
        }

        // To generate token
        private string GenerateToken(LoginModel user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),
                new Claim(ClaimTypes.Name,user.Username),
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //To authenticate user
        private async Task<LoginModel> Authenticate(string username, string password)
        {
            var users = await _userRepository.GetAllAsync();
            var currentUser = users.FirstOrDefault(x => x.Name.ToLower() == username.ToLower());

            if (currentUser != null && currentUser.VerifyPassword(password))
            {
                return new LoginModel()
                {
                    UserId = currentUser.UserId,
                    Username = currentUser.Name,
                    Email = currentUser.Email
                };
            }
            return null;
        }
    }
}
