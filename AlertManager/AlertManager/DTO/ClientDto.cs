using AlertManager.BusinessLogic.Models;

namespace AlertManager.WebAPI.DTO
{
    public class ClientDto
    {
        public string ClientName { get; set; }
        public string? CapitalGroup { get; set; }
        public string? Exposure { get; set; }
        public int UserId { get; set; }
    }
}
