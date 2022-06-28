using Datos;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class DetalleFacturaService
    {
        private readonly FacturaContext _context;
        public DetalleFacturaService(FacturaContext context)
        {
            _context = context;
        }
        public DetalleFactura? BuscarDetalle(int id) => _context?.DetalleFacturas?.Find(id);
        public string Modificar(DetalleFactura detalleNuevo)
        {
            try
            {
                var detalleViejo = _context?.DetalleFacturas?.Find(detalleNuevo.Id);

                if (detalleViejo != null)
                {
                    detalleViejo.Id = detalleNuevo.Id;
                    // detalleViejo.IdFactura = detalleNuevo.IdFactura;
                    detalleViejo.IdProducto = detalleNuevo.IdProducto;
                    detalleViejo.Cantidad = detalleNuevo.Cantidad;
                    detalleViejo.Valor = detalleNuevo.Valor;
                    detalleViejo.CalcularTotal();

                    _context!.DetalleFacturas!.Update(detalleViejo);
                    _context.SaveChanges();

                    return ($"El registro { detalleNuevo.Id } ha sido modificado");
                }
                else
                {
                    return ($"El registro { detalleNuevo.Id } no se encuentra registrado");
                }
            }
            catch (SystemException)
            {
                return "Error al modificar el detalle";
            }
        }
    }
}
