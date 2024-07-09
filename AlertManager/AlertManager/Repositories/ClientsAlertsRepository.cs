using AlertManager.DAL;
using AlertManager.Models;
using Dapper;

namespace AlertManager.Repositories
{
    public class ClientsAlertsRepository
    {
        private IDapperContext _context;

        public ClientsAlertsRepository(IDapperContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ClientAlert>> GetAllAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<ClientAlert>("SELECT * FROM ClientsAlerts");
            }
        }

        public async Task<ClientAlert> GetClientAlertByAlertId(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QuerySingleOrDefaultAsync<ClientAlert>("SELECT * FROM ClientsAlerts WHERE alert_id = @Id", new { id });
            }
        }

        public async Task<IEnumerable<ClientAlert>> GetClientAlertByClientId(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<ClientAlert>("SELECT * FROM ClientsAlerts WHERE client_id = @Id", new { id });
            }
        }
        public async Task<IEnumerable<ClientAlert>> GetClientAlertByUserId(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                return await connection.QueryAsync<ClientAlert>("SELECT * FROM ClientsAlerts WHERE user_id = @Id", new { id });
            }
        }
        
    }
}
