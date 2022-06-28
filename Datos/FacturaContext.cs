using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entidad;
using Microsoft.EntityFrameworkCore;

namespace Datos
{
    public class FacturaContext: DbContext
    {
        public FacturaContext(DbContextOptions<FacturaContext> options): base(options)
        {

        }

        public DbSet<Cliente>? Clientes { get; set; }
        public DbSet<Producto>? Productos { get; set; }
        public DbSet<Factura>? Facturas { get; set; }
        public DbSet<DetalleFactura>? DetalleFacturas { get; set; }
        public DbSet<Usuario>? Usuarios { get; set; }
        public DbSet<TipoProducto>? TipoProductos { get; set; }

    }
}