import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from '../../class/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styles: [
  ]
})
export class ConsultarProductoComponent implements OnInit {

  productos: Producto[] = [];
  producto?: Producto;

  constructor(private productoService: ProductoService,
              private router: Router) { }

  ngOnInit(): void {
    this.productoService.get().subscribe(productos => {
      this.productos = productos;
    });
  }

  registrar(){
    this.router.navigate(['user/producto/registrar-producto']);
  }

  eliminar(producto: Producto){
    this.productoService.delete(producto.id)
      .pipe(
        switchMap( (_) => this.productoService.get() )
      )
      .subscribe( resp => this.productos = resp );
  }
}
