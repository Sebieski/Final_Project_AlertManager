using AlertManager.BusinessLogic.Models;
using AlertManager.DataAccess.DAL;
using Dapper;

namespace AlertManager.DataAccess.Repositories
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
            var sql = "INSERT INTO Alerts (client_id, currency_pair, direction, amount_base, rate) " +
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
                return await connection.QuerySingleOrDefaultAsync<Alert>("SELECT * FROM Alerts WHERE alert_id = @Id", new { id });
            }
        }

        public async Task<bool> UpdateAsync(Alert alert)
        {
            //No need to implement at this stage. Alert update manageable by delete of an outstanding alert & replacing it with a new one
            return false;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var affectedRows = await connection.ExecuteAsync("DELETE FROM Alerts WHERE alert_id = @Id", new { id });
                return affectedRows > 0;
            }
        }

    }
}
