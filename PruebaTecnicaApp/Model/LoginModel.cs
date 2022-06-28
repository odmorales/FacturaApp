using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaApp.Model
{
    public class LoginInputModel
    {
        [Required(ErrorMessage = "El usuarioes requerido")]
        public string? UsuNombre { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string? UsuPass { get; set; }
    }
    public class LoginViewModel : LoginInputModel
    {
        public string? Rol { get; set; }
        public string? Token { get; set; }
    }
}
