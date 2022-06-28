using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Entidad
{
    public class DetalleFactura: ITotal
    {

        [Key]
        public int Id { get; set; }

        [ForeignKey("Producto")]
        public int IdProducto { get; set; }
        public Producto? Producto { get; set; }
        public int Cantidad { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Valor { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Total { get; set; }

        public void CalcularTotal()
        {
            this.Total = this.Valor * this.Cantidad;
        }
    }
}