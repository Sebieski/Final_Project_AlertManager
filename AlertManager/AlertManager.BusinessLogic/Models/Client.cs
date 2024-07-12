using System.ComponentModel.DataAnnotations;

namespace AlertManager.BusinessLogic.Models
{
    public class Client
    {
        public int ClientId { get; }
        [Required]
        public string ClientName { get; set; }
        public string? CapitalGroup { get; set; }
        public string? Exposure { get; set; }
        public int UserId { get; set; }
        public List<Alert> Alerts { get; set; }
    }
}
