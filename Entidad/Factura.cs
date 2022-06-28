using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class Factura: ITotal
    {
        public int Id { get; set; }

        [ForeignKey("Cliente")]
        public int IdCliente { get; set; }
        public Cliente? Cliente { get; set; }
        public DateTime FechaCompra { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Total { get; set; }
        public List<DetalleFactura>? Detalles { get; set; }

        public void CalcularTotal()
        {
            foreach (var detalle in Detalles!)
            {
                this.Total += detalle.Total;
            }
        }
    }
}
