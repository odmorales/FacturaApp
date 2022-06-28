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
    public class FacturaService
    {
        private readonly FacturaContext _context;
        public FacturaService(FacturaContext context)
        {
            _context = context;
        }
        public string Eliminar(int id)
        {
            try
            {
                var factura = _context?.Facturas?.Find(id);

                if (factura != null)
                {
                    _context!.Facturas!.Remove(factura);
                    _context.SaveChanges();

                    return ($"El cliente { factura.Id } ha sido eliminado");
                }
                else
                {
                    return "La factura no se encuentra registrado";
                }
            }
            catch (SystemException)
            {
                return "Error al eliminar la factura";
            }
        }
        public IEnumerable<Factura>? ConsultarTodos() => _context?.Facturas?
            .Include("Cliente")
            .Include("Detalles").Include("Detalles.Producto").Include("Detalles.Producto.TipoProducto")
            .ToList();

        public Factura? BuscarFactura(int id) => _context?.Facturas?
            .Where(f => f.Id == id)
            .Include("Cliente")
            .Include("Detalles").Include("Detalles.Producto").Include("Detalles.Producto.TipoProducto")
            .FirstOrDefault();
        public GuardarResponse<Factura> GuardarFactura(Factura factura)
        {
            try
            {
                calcularTotalDetalle(factura);
                factura.CalcularTotal();
                _context!.Facturas!.Add(factura);
                _context.SaveChanges();

                return new GuardarResponse<Factura>(factura);
            }
            catch (SystemException)
            {
                return new GuardarResponse<Factura>("Error al guardar la factura");
            }
        }

        private static void calcularTotalDetalle(Factura factura)
        {
            foreach (var detalle in factura.Detalles!)
            {
                detalle.CalcularTotal();
            }
        }
    }
}
