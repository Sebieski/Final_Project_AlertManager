using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AlertManager.BusinessLogic.Models;

namespace AlertManager.Services
{
    public interface IUserPasswordService
    {
        void SetPassword(User user, string plainTextPassword);
        bool VerifyPassword(User user, string plainTextPassword);
    }
}
