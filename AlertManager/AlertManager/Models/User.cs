using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BCrypt.Net;

namespace AlertManager.Models
{
    public class User
    {

        public int UserId { get; }

        public string Name { get;  set; }
       
        public string Email { get;  set; }
    
        public string Password { get; set; }

        public void SetPassword(string plainTextPassword)
        {
            Password = BCrypt.Net.BCrypt.HashPassword(plainTextPassword);
        }

        public bool VerifyPassword(string plainTextPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainTextPassword, Password);
        }
    }
}
