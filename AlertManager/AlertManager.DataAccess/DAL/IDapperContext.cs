using System.Data;

namespace AlertManager.DataAccess.DAL
{
    public interface IDapperContext
    {
        public IDbConnection CreateConnection();
    }
}
