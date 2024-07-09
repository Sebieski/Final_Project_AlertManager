using AlertManager.DTO;
using AlertManager.Models;
using AlertManager.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AlertManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AlertController : ControllerBase
    {
        private readonly IRepository<Alert> _repository;

        public AlertController(IRepository<Alert> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAlerts()
        {
            var alerts = await _repository.GetAllAsync();
            return Ok(alerts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlertById(int id)
        {
            var alert = await _repository.GetByIdAsync(id);
            if (alert == null)
            {
                return NotFound();
            }
            return Ok(alert);
        }
        
        [HttpPost]
        public async Task<IActionResult> AddAlert([FromBody] AlertDto alert)
        {
            var newAlert = new Alert()
            {
                ClientId = alert.ClientId,
                CurrencyPair = alert.CurrencyPair,
                Direction = alert.Direction,
                AmountBase = alert.AmountBase,
                Rate = alert.Rate
            };

            var createdAlertId = await _repository.AddAsync(newAlert);
            return CreatedAtAction(nameof(GetAlertById), new { id = createdAlertId }, alert);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlert(int id, [FromBody] Alert alert)
        {
            if (id != alert.AlertId)
            {
                return BadRequest();
            }

            var result = await _repository.UpdateAsync(alert);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlert(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok($"Alert {id} deleted.");
        }
    }
}
