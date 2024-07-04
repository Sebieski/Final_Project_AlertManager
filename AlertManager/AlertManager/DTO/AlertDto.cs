using System.ComponentModel.DataAnnotations;

namespace AlertManager.DTO
{
    public class AlertDto
    {
        [Required]
        public int ClientId { get; set; }

        [Required]
        [StringLength(7, MinimumLength = 7, ErrorMessage = "Wprowadź ciąg znaków o długości 7.")]
        [RegularExpression(@"^(EUR\/PLN|USD\/PLN)$", ErrorMessage = "Obsługiwane pary walutowe to: 'EUR/PLN' i 'USD/PLN'.")]
        public string CurrencyPair { get; set; }

        [Required]
        [RegularExpression(@"^(Buy|Sell)$", ErrorMessage = "Dopuszczalne kierunki: 'Buy' lub 'Sell'.")]
        public string Direction { get; set; }

        [Required]
        [Range(0, 50000000)]
        public decimal AmountBase { get; set; }

        [Required]
        [Range(3.0000, 5.9999, ErrorMessage = "Wartość musi być z przedziału od 3.0000 do 5.9999.")]
        //[RegularExpression(@"^\d{1}\.\d{4}$", ErrorMessage = "Format kursu X.XXXX.")]
        public decimal Rate { get; set; }
    }
}
