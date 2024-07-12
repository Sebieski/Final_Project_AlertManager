using AlertManager.BusinessLogic.Models;
using AlertManager.DataAccess.Repositories;
using AlertManager.WebAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AlertManager.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ClientController : ControllerBase
    {
        private readonly IRepository<Client> _repository;

        public ClientController(IRepository<Client> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await _repository.GetAllAsync();
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            var client = await _repository.GetByIdAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        [HttpPost]
        public async Task<IActionResult> AddClient([FromBody] ClientDto client)
        {
            var newClient = new Client()
            {
                ClientName = client.ClientName,
                CapitalGroup = client.CapitalGroup,
                Exposure = client.Exposure,
                UserId = client.UserId,
                Alerts = new List<Alert>() //new client does not have any outstanding alerts
            };
            var createdClientId = await _repository.AddAsync(newClient);
            return CreatedAtAction(nameof(GetClientById), new { id = createdClientId }, client);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] Client client)
        {
            if (id != client.ClientId)
            {
                return BadRequest();
            }

            var result = await _repository.UpdateAsync(client);
            if (!result)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var result = await _repository.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok($"Client {id} deleted.");
        }
    }
}
