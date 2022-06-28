import { Producto } from "../../producto/class/producto";

export class DetalleFactura {
    id: number = 0;
    idProducto: number = 0;
    cantidad: number = 0;
    valor: number = 0;
    total: number = 0;

    producto?: Producto;
}