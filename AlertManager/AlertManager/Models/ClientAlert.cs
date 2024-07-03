using System.ComponentModel.DataAnnotations;

namespace AlertManager.Models
{
    public class ClientAlert
    {
        public int ClientId { get; }
        [Required]
        public string ClientName { get; set; }
        public string? CapitalGroup { get; set; }
        public string? Exposure { get; set; }
        public int UserId { get; set; }
        public int AlertId { get; set; }
        [Required]
        [MaxLength(7)]
        public string CurrencyPair { get; set; }
        [Required]
        [MaxLength(4)]
        public string Direction { get; set; }
        [Required]
        public decimal AmountBase { get; set; }
        [Required]
        public decimal Rate { get; set; }
    }
}
