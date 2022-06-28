using Datos;
using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class UsuarioService
    {
        private readonly FacturaContext _context;
        public UsuarioService(FacturaContext context) => _context = context;
        public Usuario? ValidarCredenciales(string nombreUsuario, string contrasena) => _context.Usuarios?
            .FirstOrDefault(t => t.UsuNombre == nombreUsuario.ToUpper() && t.UsuPass == contrasena);

        public Usuario? ConsulterUsuario(string nombreUsuario) => _context.Usuarios?
            .FirstOrDefault(t => t.UsuNombre == nombreUsuario);
    }
}
