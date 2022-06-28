import { Component, OnInit } from '@angular/core';

import { Producto } from '../../class/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { ValidarService } from 'src/app/shared/services/validar.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Observable, switchMap } from 'rxjs';
import { AutoCompleteService } from '../../../shared/services/auto-complete.service';
import { CategoriaService } from '../../../tipo-producto/services/categoria.service';
import { TipoProducto } from '../../../tipo-producto/class/tipo';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styles: [
  ]
})
export class RegistrarProductoComponent implements OnInit {

  producto: Producto;
  categorias: TipoProducto[] = [];
  filteredOptions?: Observable<TipoProducto[]>;
  lista: TipoProducto[] = [];
  dato: any;

  miFormulario: FormGroup = this.fb.group({
    idTipoProducto: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: ['',],
    existencia: ['', Validators.required],
    valor: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    public validarService: ValidarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private autoCompleteService: AutoCompleteService,
    private categoriaService: CategoriaService) {
    this.validarService.recibirFomulario(this.miFormulario);
    this.producto = new Producto();
  }

  autoComplete(){
    this.categoriaService.get().subscribe(categorias => {
      this.categorias = categorias;

      this.filteredOptions = this.autoCompleteService.autoComplete(this.categorias, 'idTipoProducto');
      this.filteredOptions?.subscribe( result => this.lista = result );
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent, tipo: string) {

    this.dato = event.option.value;

    this.autoCompleteService.opcionSeleccionada( this.dato, tipo );
  }

  ngOnInit(): void {
    this.init();
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productoService.getId(id))
      )
      .subscribe(producto => {
        this.producto = producto;
        this.miFormulario.reset(this.producto);
      });
  }

  init(){
    this.autoCompleteService.recibirForm(this.miFormulario);
    this.autoComplete();
  }

  consultar() {
    this.router.navigate(['user/producto/consultar-producto']);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    if(this.producto.id){
      this.editar();
    }else{
      var producto = new Producto();
      producto = this.miFormulario.value;
      producto.idTipoProducto = this.dato.id;
  
      this.productoService.post(producto).subscribe(resp => {
        if (resp.ok !== false) {
          Swal.fire('Producto guardado correctamente', resp.error, 'success');
          this.miFormulario.reset();
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
    }

  }

  editar() {

    var producto = new Producto();
    producto = this.miFormulario.value;
    producto.id = this.producto.id;

    this.productoService.put(producto).subscribe(resp => {
      Swal.fire('Producto modificado correctamente', resp.id, 'success');
      this.router.navigate(['user/producto/consultar-producto']);
    });
  }

}
