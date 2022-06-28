using Datos;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PruebaTecnicaApp.Config;
using PruebaTecnicaApp.Model;
using PruebaTecnicaApp.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaTecnicaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private UsuarioService usuarioService;
        JwtService _jwtService;
        public LoginController(FacturaContext context, IOptions<AppSetting> appSettings)
        {
            usuarioService = new UsuarioService(context);
            _jwtService = new JwtService(appSettings);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<LoginViewModel> Post([FromBody] LoginInputModel model)
        {
            var usuario = usuarioService.ValidarCredenciales(model.UsuNombre!, model.UsuPass!);

            if (usuario == null)
                return NotFound("Usuario o contraseña inválidos.");

            var respuesta = _jwtService.GenerarToken(usuario);

            return Ok(respuesta);
        }

        [HttpGet("RenovarToken")]
        public ActionResult<LoginViewModel> RenovarToken()
        {
            string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last()!;

            var nombreUsuario = _jwtService.VerificarToken(token);

            if (nombreUsuario == null)
                return Unauthorized("Token no válido 1");

            var usuario = usuarioService.ConsulterUsuario(nombreUsuario);

            if (usuario == null)
                return Unauthorized("Token no válido 2");

            var respuesta = _jwtService.GenerarToken(usuario);

            return Ok(respuesta);
        }
    }
}
