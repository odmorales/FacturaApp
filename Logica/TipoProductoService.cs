using Datos;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class TipoProductoService
    {
        private readonly FacturaContext _context;
        public TipoProductoService(FacturaContext context)
        {
            _context = context;
        }
        public string Eliminar(int id)
        {
            try
            {
                var tipoProducto = _context?.TipoProductos?.Find(id);

                if (tipoProducto != null)
                {
                    _context!.TipoProductos!.Remove(tipoProducto);
                    _context.SaveChanges();

                    return ($"El tipo { tipoProducto.Nombre } ha sido eliminado");
                }
                else
                {
                    return "El tipo no se encuentra registrado";
                }
            }
            catch (SystemException)
            {
                return "Error al eliminar el tipo";
            }
        }
        public string Modificar(TipoProducto tipoNuevo)
        {
            try
            {
                var tipoViejo = _context?.TipoProductos?.Find(tipoNuevo.Id);

                if (tipoViejo != null)
                {
                    tipoViejo.Id = tipoNuevo.Id;
                    tipoViejo.Nombre = tipoNuevo.Nombre;
                    tipoViejo.Descripcion = tipoNuevo.Descripcion;

                    _context!.TipoProductos!.Update(tipoViejo);
                    _context.SaveChanges();

                    return ($"El registro { tipoNuevo.Id } ha sido modificado");
                }
                else
                {
                    return ($"El registro { tipoNuevo.Id } no se encuentra registrado");
                }
            }
            catch (SystemException)
            {
                return "Error al modificar el tipo";
            }
        }
        public IEnumerable<TipoProducto>? ConsultarTodos() => _context?.TipoProductos?.ToList();
        public TipoProducto? BuscarTipo(int id) => _context?.TipoProductos?.Find(id);
        public GuardarResponse<TipoProducto> GuardarTipo(TipoProducto tipo)
        {
            try
            {
                _context!.TipoProductos!.Add(tipo);
                _context.SaveChanges();

                return new GuardarResponse<TipoProducto>(tipo);
            }
            catch (SystemException)
            {
                return new GuardarResponse<TipoProducto>("Error al guardar el tipo");
            }
        }
    }
}
