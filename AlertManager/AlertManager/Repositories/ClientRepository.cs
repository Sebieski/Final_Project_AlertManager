using AlertManager.DAL;
using AlertManager.Models;
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
            var sql = "INSERT INTO Clients (ClientName, CapitalGroup, Exposure, UserId, Alerts) " +
                      "VALUES (@ClientName, @CapitalGroup, @Exposure, @UserId, @Alerts); " +
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
                return await connection.QuerySingleOrDefaultAsync<Client>("SELECT * FROM Clients WHERE ClientId = @Id", new { id });
            }
        }

        public async Task<bool> UpdateAsync(Client client)
        {
            //brak możliwości zmiany nazwy czy grupy kapitałowej klienta, możliwa zmiana przypisanego Dealera lub danych dotyczących ekspozycji na ryzyko walutowe (= zmiana profilu działalności spółki lub sezonowość w biznesie)
            var sql = "UPDATE Clients SET Exposure = @Exposure, UserId = @UserId WHERE ClientId = @ClientId";
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
                var affectedRows = await connection.ExecuteAsync("DELETE FROM Clients WHERE ClientId = @Id", new { id });
                return affectedRows > 0;
            }
        }
    }
}
