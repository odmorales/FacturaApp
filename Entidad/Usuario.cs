using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        public string? UsuNombre { get; set; }
        public string? UsuPass { get; set; }
        public string? Rol { get; set; }
    }
}
