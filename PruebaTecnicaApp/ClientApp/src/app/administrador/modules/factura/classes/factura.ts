import { Cliente } from "../../cliente/class/cliente";
import { DetalleFactura } from './detalleFactura';

export class Factura {
    id: number = 0;
    idCliente: number = 0;
    fechaCompra: Date = new Date();
    total: number = 0;
    detalles: DetalleFactura[] = [];

    cliente?: Cliente;
}