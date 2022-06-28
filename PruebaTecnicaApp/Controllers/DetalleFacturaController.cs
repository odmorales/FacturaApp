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
    public class DetalleFacturaController : ControllerBase
    {
        private readonly DetalleFacturaService _detalleFacturaService;
        public DetalleFacturaController(FacturaContext contex)
        {
            _detalleFacturaService = new DetalleFacturaService(contex);
        }

        // PUT api/<DetalleFacturaController>/5
        [HttpPut("{id}")]
        public ActionResult<string> Put(int id, DetalleFacturaUpdateModel detalleUpdate)
        {
            var detalle = _detalleFacturaService.BuscarDetalle(id);

            if (detalle == null)
            {
                return BadRequest("Detalle no encontrado");
            }

            DetalleFactura detalleFactura = MapearDetalleUpdate(detalleUpdate, detalle.Id!);

            var mensaje = _detalleFacturaService.Modificar(detalleFactura);

            return Ok(mensaje);
        }


        [NonAction]
        public DetalleFactura MapearDetalleUpdate(DetalleFacturaUpdateModel detalleUpdate, int id)
        {
            DetalleFactura detalle = new DetalleFactura
            {
                Id = id,
                Cantidad = detalleUpdate.Cantidad,
                Valor = detalleUpdate.Valor,
                // IdFactura = detalleUpdate.IdFactura,
                IdProducto = detalleUpdate.IdProducto,
            };

            return detalle;
        }
    }
}
