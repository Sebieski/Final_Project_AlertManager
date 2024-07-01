namespace AlertManager.DTO
{
    public class AlertDto
    {
        public int ClientId { get; set; }
        public string CurrencyPair { get; set; }
        public string Direction { get; set; }
        public decimal AmountBase { get; set; }
        public decimal Rate { get; set; }
    }
}
