using System.Data;

namespace AlertManager.DAL
{
    public interface IDapperContext
    {
        public IDbConnection CreateConnection();
    }
}
