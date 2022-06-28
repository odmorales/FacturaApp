using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Entidad
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("TipoProducto")]
        public int IdTipoProducto { get; set; }
        public TipoProducto? TipoProducto { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public double Existencia { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Valor { get; set; }

    }
}