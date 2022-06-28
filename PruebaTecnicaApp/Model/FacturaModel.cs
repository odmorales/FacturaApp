using Entidad;
using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaApp.Model
{
    public class FacturaInputModel
    {
        [Required(ErrorMessage = "Error, el cliente es requerido")]
        public int IdCliente { get; set; }
        public DateTime FechaCompra { get; set; }
        public List<DetalleFactura>? Detalles { get; set; }
    }

    public class FacturaViewModel: FacturaInputModel
    {
        public FacturaViewModel(Factura factura)
        {
            this.Id = factura.Id;
            this.IdCliente = factura.IdCliente;
            this.Cliente = factura.Cliente;
            this.FechaCompra = factura.FechaCompra;
            this.Total = factura.Total;
            this.Detalles = factura.Detalles;
        }
        public int Id { get; set; }
        public decimal Total { get; set; }
        public Cliente? Cliente { get; set; }
    }
}
