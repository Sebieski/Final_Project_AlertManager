using AlertManager.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlertManager.Services
{
    public class UserPasswordService : IUserPasswordService
    {
        public void SetPassword(User user, string plainTextPassword)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(plainTextPassword);
        }

        public bool VerifyPassword(User user, string plainTextPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainTextPassword, user.Password);
        }
    }
}
