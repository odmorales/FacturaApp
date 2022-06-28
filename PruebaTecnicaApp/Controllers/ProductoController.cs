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
    public class ProductoController : ControllerBase
    {
        private readonly ProductoService _productoService;
        public ProductoController(FacturaContext context)
        {
            _productoService = new ProductoService(context);
        }

        // GET: api/<ProductoController>
        [HttpGet]
        public IEnumerable<ProductoViewModel> Get() => _productoService.ConsultarTodos()!
            .Select(p => new ProductoViewModel(p));

        // GET api/<ProductoController>/5
        [HttpGet("{id}")]
        public ActionResult<ProductoViewModel> Get(int id)
        {
            var producto = _productoService.BuscarProducto(id);

            if (producto == null)
            {
                return NotFound("No se encontro el pedido");
            }

            return Ok(new ProductoViewModel(producto!));
        }

        // POST api/<ProductoController>
        [HttpPost]
        public ActionResult<ProductoViewModel> Post(ProductoInputModel productoInput)
        {
            var producto = MapearProducto(productoInput);

            var respuesta = _productoService.GuardarProducto(producto);

            if (respuesta.Error)
            {
                ModelState.AddModelError("Guardar producto", respuesta.Mensaje!);
                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status500InternalServerError,
                };

                return StatusCode(500, problemDetails);
            }

            return Ok(new ProductoViewModel(respuesta.Objeto!));
        }

        // PUT api/<ProductoController>/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, ProductoUpdateModel productoUpdate)
        {
            var product = _productoService.BuscarProducto(id);

            if (product == null)
            {
                return BadRequest("Producto no encontrado");
            }

            Producto producto = MapearProductoUpdate(productoUpdate, product.Id!);

            var mensaje = _productoService.Modificar(producto);

            return Ok(mensaje);
        }

        // DELETE api/<ProductoController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(int id)
        {
            string mensaje = _productoService.Eliminar(id);

            return Ok(mensaje);
        }

        [NonAction]
        public Producto MapearProducto(ProductoInputModel productoInputModel)
        {
            Producto producto = new Producto
            {
                Nombre = productoInputModel.Nombre,
                IdTipoProducto = productoInputModel.IdTipoProducto,
                Existencia = productoInputModel.Existencia,
                Descripcion = productoInputModel.Descripcion,
                Valor = productoInputModel.Valor
            };

            return producto;
        }

        [NonAction]
        public Producto MapearProductoUpdate(ProductoUpdateModel productoUpdate, int id)
        {
            Producto producto = new Producto
            {
                Id = id,
                Nombre = productoUpdate.Nombre,
                IdTipoProducto = productoUpdate.IdTipoProducto,
                Existencia = productoUpdate.Existencia,
                Descripcion = productoUpdate.Descripcion,
                Valor = productoUpdate.Valor
            };

            return producto;
        }
    }
}
