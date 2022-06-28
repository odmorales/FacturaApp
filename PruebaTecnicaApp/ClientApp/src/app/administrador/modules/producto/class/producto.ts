import { TipoProducto } from '../../tipo-producto/class/tipo';

export class Producto {
    id: number = 0;
    idTipoProducto: number = 0;
    nombre?: string;
    descripcion?: string;
    existencia: number = 0;
    valor: number = 0;

    tipoProducto?: TipoProducto;
}