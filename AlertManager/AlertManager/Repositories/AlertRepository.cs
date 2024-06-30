using AlertManager.DAL;
using AlertManager.Models;
using Dapper;

namespace AlertManager.Repositories
{
    public class AlertRepository : IRepository<Alert>
    {
        private IDapperContext _context;

        public AlertRepository(IDapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Alert>> GetAllAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<Alert>("SELECT * FROM Alerts");
            }
        }

        public async Task<int> AddAsync(Alert alert)
        {
            var sql = "INSERT INTO Alerts (ClientId, CurrencyPair, Direction, AmountBase, Rate) " +
                      "VALUES (@ClientId, @CurrencyPair, @Direction, @AmountBase, @Rate); " +
                      "SELECT CAST(SCOPE_IDENTITY() as int);";

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(sql, alert);
                return id;
            }
        }

        public async Task<Alert> GetByIdAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<Alert>("SELECT * FROM Alerts WHERE AlertId = @Id", new { id });
            }
        }

        public async Task<bool> UpdateAsync(Alert alert)
        {
            //Brak potrzeby implementacji - update dokonywany przez usuwanie zbędnych alertów i dodawanie nowych
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var affectedRows = await connection.ExecuteAsync("DELETE FROM Alerts WHERE AlertId = @Id", new { id });
                return affectedRows > 0;
            }
        }

    }
}
