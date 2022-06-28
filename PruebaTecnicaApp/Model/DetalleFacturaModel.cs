using Entidad;

namespace PruebaTecnicaApp.Model
{
    public class DetalleFacturaUpdateModel
    {
        public int IdProducto { get; set; }
        public int IdFactura { get; set; }
        public int Cantidad { get; set; }
        public decimal Valor { get; set; }
    }
}
