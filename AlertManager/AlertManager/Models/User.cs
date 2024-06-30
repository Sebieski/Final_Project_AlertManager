using System.ComponentModel.DataAnnotations;

namespace AlertManager.Models
{
    public class User
    {

        public int UserId { get; }
        [Required]
        public string UserName { get; private set; }
        [Required]
        [EmailAddress]
        public string Email { get; private set; }
        [Required]
        public string PasswordHash { get; private set; }
    }
}
