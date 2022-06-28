using Datos;
using Entidad;

namespace Logica
{
    public class ClienteService
    {
        private readonly FacturaContext _context;
        public ClienteService(FacturaContext context)
        {
            _context = context;
        }
        public string Eliminar(int id)
        {
            try
            {
                var cliente = _context?.Clientes?.Find(id);

                if (cliente != null)
                {
                    _context!.Clientes!.Remove(cliente);
                    _context.SaveChanges();

                    return ($"El cliente { cliente.Nombre } ha sido eliminado");
                }
                else
                {
                    return "El cliente cliente no se encuentra registrado";
                }
            }catch (SystemException)
            {
                return "Error al eliminar el cliente";
            }
        }
        public string Modificar(Cliente clienteNuevo)
        {
            try
            {
                var clienteViejo = _context?.Clientes?.Find(clienteNuevo.Id);

                if (clienteViejo != null)
                {
                    clienteViejo.Id = clienteNuevo.Id;
                    clienteViejo.Direccion = clienteNuevo.Direccion;
                    clienteViejo.Edad = clienteNuevo.Edad;
                    clienteViejo.Apellido = clienteNuevo.Apellido;
                    clienteViejo.Nombre = clienteNuevo.Nombre;

                    _context!.Clientes!.Update(clienteViejo);
                    _context.SaveChanges();

                    return ($"El registro { clienteNuevo.Id } ha sido modificado");
                }
                else
                {
                    return ($"El registro { clienteNuevo.Id } no se encuentra registrado");
                }
            }catch (SystemException)
            {
                return "Error al modificar al cliente";
            }
        }
        public IEnumerable<Cliente>? ConsultarTodos() => _context?.Clientes?.ToList();
        public Cliente? BuscarCliente(int id) => _context?.Clientes?.Find(id);
        public GuardarResponse<Cliente> GuardarCliente(Cliente cliente)
        {
            try
            {
                _context!.Clientes!.Add(cliente);
                _context.SaveChanges();

                return new GuardarResponse<Cliente>(cliente);
            }catch (SystemException)
            {
                return new GuardarResponse<Cliente>("Error al guardar al cliente");
            }
        }
    }
}