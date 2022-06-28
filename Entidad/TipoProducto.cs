using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class TipoProducto
    {
        [Key]
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion  { get; set; }
    }
}
