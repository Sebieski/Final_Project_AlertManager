using AlertManager.BusinessLogic.Models;
using AlertManager.DAL;
using AlertManager.DTO;
using Dapper;
using static Dapper.SqlMapper;

namespace AlertManager.Repositories
{
    public class ClientRepository : IRepository<Client>
    {
        private IDapperContext _context;

        public ClientRepository(IDapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetAllAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<Client>("SELECT * FROM Clients");
            }
        }

        public async Task<int> AddAsync(Client client)
        {
            var sql = "INSERT INTO Clients (client_name, capital_group, exposure, user_id) " +
                      "VALUES (@ClientName, @CapitalGroup, @Exposure, @UserId); " +
                      "SELECT CAST(SCOPE_IDENTITY() as int);";

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(sql, client);
                return id;
            }
        }

        public async Task<Client> GetByIdAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<Client>("SELECT * FROM Clients WHERE client_id = @Id", new { id });
            }
        }

        public async Task<bool> UpdateAsync(Client client)
        {
            //updatable fields: associated Dealer (UserId) and exposure (possible change in business model). Not updatable: Name and Capital Group.
            var sql = "UPDATE Clients SET exposure = @Exposure, user_id = @UserId WHERE client_id = @ClientId";
            using (var connection = _context.CreateConnection())
            {
                var affectedRows = await connection.ExecuteAsync(sql, client);
                return affectedRows > 0;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var affectedRows = await connection.ExecuteAsync("DELETE FROM Clients WHERE client_id = @Id", new { id });
                return affectedRows > 0;
            }
        }
    }
}
