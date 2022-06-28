using Datos;
using Entidad;
using Logica;
using Microsoft.AspNetCore.Mvc;
using PruebaTecnicaApp.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnicaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService _clienteService;
        public ClienteController(FacturaContext context)
        {
            _clienteService = new ClienteService(context);
        }
        // GET: api/<ClienteController>
        [HttpGet]
        public IEnumerable<ClienteViewModel> Get() => _clienteService.ConsultarTodos()!
            .Select(c => new ClienteViewModel(c));
        
        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public ActionResult<ClienteViewModel> Get(int id)
        {
            var cliente = _clienteService.BuscarCliente(id);

            if (cliente == null)
            {
                return NotFound("No se encontro el pedido");
            }

            return Ok(new ClienteViewModel(cliente!));
        }

        // POST api/<ClienteController>
        [HttpPost]
        public ActionResult<ClienteViewModel> Post(ClienteInputModel clienteInput)
        {
            var cliente = MapearCliente(clienteInput);

            var respuesta = _clienteService.GuardarCliente(cliente);

            if (respuesta.Error)
            {
                ModelState.AddModelError("Guardar cliente", respuesta.Mensaje!);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status500InternalServerError,
                };

                return StatusCode(500, problemDetails);
            }

            return Ok(new ClienteViewModel(respuesta.Objeto!));
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, ClienteUpdateModel clienteUpdate)
        {
            var client = _clienteService.BuscarCliente(id);

            if (client == null)
            {
                return BadRequest("Cliente no encontrado");
            }

            Cliente cliente = MapearClienteUpdate(clienteUpdate, client.Id!);

            var mensaje = _clienteService.Modificar(cliente);

            return Ok(mensaje);
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            string mensaje = _clienteService.Eliminar(id);

            return Ok(mensaje);
        }

        [NonAction]
        public Cliente MapearCliente(ClienteInputModel clienteInputModel)
        {
            Cliente cliente = new Cliente
            {
                Nombre = clienteInputModel.Nombre,
                Apellido = clienteInputModel.Apellido,
                Direccion = clienteInputModel.Direccion,
                Edad = clienteInputModel.Edad
            };

            return cliente;
        }

        [NonAction]
        public Cliente MapearClienteUpdate(ClienteUpdateModel clienteUpdate, int id)
        {
            Cliente cliente = new Cliente
            {
                Id = id,
                Nombre = clienteUpdate.Nombre,
                Apellido = clienteUpdate.Apellido,
                Direccion = clienteUpdate.Direccion,
                Edad = clienteUpdate.Edad
            };

            return cliente;
        }
    }
}
