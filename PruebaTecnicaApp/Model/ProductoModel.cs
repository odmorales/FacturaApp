using Entidad;
using System.ComponentModel.DataAnnotations;

namespace PruebaTecnicaApp.Model
{
    public class ProductoInputModel
    {
        public int IdTipoProducto { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }

        [Required(ErrorMessage = "La cantidad es requerida")]
        public double Existencia { get; set; }

        [Required(ErrorMessage = "El precio es requerido")]
        public decimal Valor { get; set; }
    }

    public class ProductoViewModel: ProductoInputModel
    {
        public ProductoViewModel(Producto producto)
        {
            this.Id = producto.Id;
            this.IdTipoProducto = producto.IdTipoProducto;
            this.TipoProducto = producto.TipoProducto;
            this.Nombre = producto.Nombre;
            this.Descripcion = producto.Descripcion;
            this.Valor = producto.Valor;
            this.Existencia = producto.Existencia;

        }
        public int Id { get; set; }
        public TipoProducto? TipoProducto { get; set; }
    }

    public class ProductoUpdateModel
    {
        public int IdTipoProducto { get; set; }
        public TipoProducto? TipoProducto { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public double Existencia { get; set; }
        public decimal Valor { get; set; }
    }
}
