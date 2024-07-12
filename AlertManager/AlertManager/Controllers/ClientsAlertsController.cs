using AlertManager.DataAccess.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AlertManager.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    [Authorize]
    public class ClientsAlertsController : ControllerBase
    {
        private readonly ClientsAlertsRepository _repository;

        public ClientsAlertsController(ClientsAlertsRepository repository)
        {
            _repository = repository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllRecords()
        {
            var records = await _repository.GetAllAsync();
            return Ok(records);
        }

        [HttpGet("alert/{id}")]
        public async Task<IActionResult> GetRecordByAlertId(int id)
        {
            var record = await _repository.GetClientAlertByAlertId(id);
            if (record == null)
            {
                return NotFound();
            }
            return Ok(record);
        }

        [HttpGet("client/{id}")]
        public async Task<IActionResult> GetRecordsByClientId(int id)
        {
            var records = await _repository.GetClientAlertByClientId(id);
            if (records == null)
            {
                return NotFound();
            }
            return Ok(records);
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetRecordsByUserId(int id)
        {
            var records = await _repository.GetClientAlertByUserId(id);
            if (records == null)
            {
                return NotFound();
            }
            return Ok(records);
        }
    }
}
