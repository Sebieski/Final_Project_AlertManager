using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AlertManager.Models
{
    public class Alert
    {
        public int AlertId { get; set; }
        public int ClientId { get; set; }
        [Required]
        [MaxLength(7)]
        public string CurrencyPair { get; set; }
        [Required]
        [MaxLength(50)]
        public string Direction { get; set; }
        [Required]
        public decimal AmountBase { get; set; }
        [Required]
        public decimal Rate { get; set; }
    }
}
