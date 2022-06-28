import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoProducto } from '../../class/tipo';
import { CategoriaService } from '../../services/categoria.service';

import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductoService } from '../../../producto/services/producto.service';
import { Producto } from '../../../producto/class/producto';

@Component({
  selector: 'app-consultar-tipo',
  templateUrl: './consultar-tipo.component.html',
  styles: [
  ]
})
export class ConsultarTipoComponent implements OnInit {

  categorias: TipoProducto[] = [];
  productos: Producto[] = [];
  categoria?: TipoProducto;

  constructor(private categoriaService: CategoriaService,
              private productoService: ProductoService,
              private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.get().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  registrar(){
    this.router.navigate(['user/categoria/registrar-tipo']);
  }

  eliminar(categoria: TipoProducto) {
    this.productoService.get().subscribe(resp => {
      this.productos = resp;
      if (this.productos.find(producto => producto.idTipoProducto == categoria.id)) {
         this.mensajeError();
      } else {
        this.categoriaService.delete(categoria.id)
          .pipe(
            switchMap((_) => this.categoriaService.get())
          )
          .subscribe(resp => this.categorias = resp);
      }
    });
  }

  mensajeError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Producto esta asociado a una categoria!'
    });
  }

}
