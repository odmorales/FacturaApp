
using Entidad;
using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaApp.Model
{
    public class ClienteInputModel
    {
        [Required(ErrorMessage = "El nombre es requerida")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El apellido es requerida")]
        public string? Apellido { get; set; }
        public string? Direccion { get; set; }

        [Required(ErrorMessage = "La edad es requerida")]
        [Range(1, 99, ErrorMessage = "La edad debe estar en el rango de 1 a 99")]
        public int Edad { get; set; }
    }

    public class ClienteViewModel: ClienteInputModel
    {
        public ClienteViewModel(Cliente cliente)
        {
            this.Id = cliente.Id;
            this.Nombre = cliente.Nombre;
            this.Apellido = cliente.Apellido;
            this.Direccion = cliente.Direccion;
            this.Edad = cliente.Edad;
        }
        public int Id { get; set; }
    }

    public class ClienteUpdateModel
    {
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Direccion { get; set; }
        public int Edad { get; set; }
    }
}
