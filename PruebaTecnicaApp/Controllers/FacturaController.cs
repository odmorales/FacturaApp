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
    public class FacturaController : ControllerBase
    {
        private readonly FacturaService _facturaService;
        public FacturaController(FacturaContext context)
        {
            _facturaService = new FacturaService(context);
        }
        // GET: api/<FacturaController>
        [HttpGet]
        public IEnumerable<FacturaViewModel> Get() => _facturaService.ConsultarTodos()!
            .Select(f => new FacturaViewModel(f));

        // GET api/<FacturaController>/5
        [HttpGet("{id}")]
        public ActionResult<FacturaViewModel> Get(int id)
        {
            var factura = _facturaService.BuscarFactura(id);

            if (factura == null)
            {
                return NotFound("No se encontro la factura");
            }

            return Ok(new FacturaViewModel(factura!));
        }

        // POST api/<FacturaController>
        [HttpPost]
        public ActionResult<FacturaViewModel> Post(FacturaInputModel facturaInput)
        {
            var factura = MapearFactura(facturaInput);

            var respuesta = _facturaService.GuardarFactura(factura);

            if (respuesta.Error)
            {
                ModelState.AddModelError("Guardar factura", respuesta.Mensaje!);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status500InternalServerError,
                };

                return StatusCode(500, problemDetails);
            }

            return Ok(new FacturaViewModel(respuesta.Objeto!));
        }

        // DELETE api/<FacturaController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            string mensaje = _facturaService.Eliminar(id);

            return Ok(mensaje);
        }

        [NonAction]
        public Factura MapearFactura(FacturaInputModel facturaInput)
        {
            Factura factura = new Factura
            {
                IdCliente = facturaInput.IdCliente,
                FechaCompra = facturaInput.FechaCompra,
                Detalles = facturaInput.Detalles,
            };

            return factura;
        }
    }
}
