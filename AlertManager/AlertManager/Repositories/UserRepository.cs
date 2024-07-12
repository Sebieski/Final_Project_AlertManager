using AlertManager.BusinessLogic.Models;
using AlertManager.DAL;
using Dapper;

namespace AlertManager.Repositories
{
    public class UserRepository
    {
        private IDapperContext _context;

        public UserRepository(IDapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<User>("SELECT * FROM Users");
            }
        }
    }
}
