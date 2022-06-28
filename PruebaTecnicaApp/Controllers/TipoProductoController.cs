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
    public class TipoProductoController : ControllerBase
    {
        private readonly TipoProductoService _tipoProductoService;
        public TipoProductoController(FacturaContext context)
        {
            _tipoProductoService = new TipoProductoService(context);
        }
        // GET: api/<TipoFacturaController>
        [HttpGet]
        public IEnumerable<TipoProductoViewModel> Get() => _tipoProductoService.ConsultarTodos()!
            .Select(t => new TipoProductoViewModel(t));

        // GET api/<TipoFacturaController>/5
        [HttpGet("{id}")]
        public ActionResult<TipoProductoViewModel> Get(int id)
        {
            var tipo = _tipoProductoService.BuscarTipo(id);

            if (tipo == null)
            {
                return NotFound("No se encontro el tipo");
            }

            return Ok(new TipoProductoViewModel(tipo!));
        }

        // POST api/<TipoFacturaController>
        [HttpPost]
        public ActionResult<TipoProductoViewModel> Post(TipoProductoInputModel tipoInput)
        {
            var tipo = MapearTipo(tipoInput);

            var respuesta = _tipoProductoService.GuardarTipo(tipo);

            if (respuesta.Error)
            {
                ModelState.AddModelError("Guardar tipo producto", respuesta.Mensaje!);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status500InternalServerError,
                };

                return StatusCode(500, problemDetails);
            }

            return Ok(new TipoProductoViewModel(respuesta.Objeto!));
        }

        // PUT api/<TipoFacturaController>/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, TipoProductoUpdateModel tipoUpdate)
        {
            var tipoProducto = _tipoProductoService.BuscarTipo(id);

            if (tipoProducto == null)
            {
                return BadRequest("Tipo no encontrado");
            }

            TipoProducto tipo = MapearTipoUpdate(tipoUpdate, tipoProducto.Id!);

            var mensaje = _tipoProductoService.Modificar(tipo);

            return Ok(mensaje);
        }

        // DELETE api/<TipoFacturaController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            string mensaje = _tipoProductoService.Eliminar(id);

            return Ok(mensaje);
        }

        [NonAction]
        public TipoProducto MapearTipo(TipoProductoInputModel tipoInput)
        {
            TipoProducto tipo = new TipoProducto
            {
                Nombre = tipoInput.Nombre,
                Descripcion = tipoInput.Descripcion,
            };

            return tipo;
        }

        [NonAction]
        public TipoProducto MapearTipoUpdate(TipoProductoUpdateModel tipoUpdate, int id)
        {
            TipoProducto tipo = new TipoProducto
            {
                Id = id,
                Nombre = tipoUpdate.Nombre,
                Descripcion = tipoUpdate.Descripcion,
            };

            return tipo;
        }
    }
}
