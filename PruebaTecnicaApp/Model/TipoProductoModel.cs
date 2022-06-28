using Entidad;
using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaApp.Model
{
    public class TipoProductoInputModel
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
    }
    public class TipoProductoViewModel: TipoProductoInputModel
    {
        public TipoProductoViewModel(TipoProducto tipoProducto)
        {
            this.Id = tipoProducto.Id;
            this.Nombre = tipoProducto.Nombre;
            this.Descripcion = tipoProducto.Descripcion;
        }
        public int Id { get; set; }
    }
    public class TipoProductoUpdateModel
    {
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
    }
}
