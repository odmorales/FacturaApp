using Datos;
using Entidad;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class ProductoService
    {
        private readonly FacturaContext _context;
        public ProductoService(FacturaContext context)
        {
            _context = context;
        }
        public string Eliminar(int id)
        {
            try
            {
                var producto = _context?.Productos?.Find(id);

                if (producto != null)
                {
                    _context!.Productos!.Remove(producto);
                    _context.SaveChanges();

                    return ($"El producto { producto.Nombre } ha sido eliminado");
                }
                else
                {
                    return "El producto no se encuentra registrado";
                }
            }
            catch (SystemException)
            {
                return "Error al eliminar el producto";
            }
        }
        public string Modificar(Producto productoNuevo)
        {
            try
            {
                var productoViejo = _context?.Productos?.Find(productoNuevo.Id);

                if (productoViejo != null)
                {
                    productoViejo.Id = productoNuevo.Id;
                    productoViejo.IdTipoProducto = productoNuevo.IdTipoProducto;
                    productoViejo.Nombre = productoNuevo.Nombre;
                    productoViejo.Descripcion = productoNuevo.Descripcion;
                    productoViejo.Existencia = productoNuevo.Existencia;
                    productoViejo.Valor = productoNuevo.Valor;

                    _context!.Productos!.Update(productoViejo);
                    _context.SaveChanges();

                    return ($"El registro { productoNuevo.Id } ha sido modificado");
                }
                else
                {
                    return ($"El registro { productoNuevo.Id } no se encuentra registrado");
                }
            }
            catch (SystemException)
            {
                return "Error al modificar al producto";
            }
        }
        public IEnumerable<Producto>? ConsultarTodos() => _context?.Productos?
            .Include("TipoProducto")
            .ToList();
        public Producto? BuscarProducto(int id) => _context?.Productos?.Find(id);
        public GuardarResponse<Producto> GuardarProducto(Producto producto)
        {
            try
            {
                _context!.Productos!.Add(producto);
                _context.SaveChanges();

                return new GuardarResponse<Producto>(producto);
            }
            catch (SystemException)
            {
                return new GuardarResponse<Producto>("Error al guardar el producto");
            }
        }
    }
}
