import { Component, OnInit } from '@angular/core';
import { Factura } from '../../classes/factura';
import { DetalleFactura } from '../../classes/detalleFactura';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FacturaService } from '../../services/factura.service';
import { ValidarService } from 'src/app/shared/services/validar.service';
import {  Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Cliente } from '../../../cliente/class/cliente';
import { Observable } from 'rxjs';
import { AutoCompleteService } from '../../../shared/services/auto-complete.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Producto } from '../../../producto/class/producto';
import { ProductoService } from '../../../producto/services/producto.service';


@Component({
  selector: 'app-registro-factura',
  templateUrl: './registro-factura.component.html',
  styles: [
  ]
})
export class RegistroFacturaComponent implements OnInit {

  factura?: Factura;

  filteredClientes?: Observable<Cliente[]>;
  clientes: Cliente[] = [];
  lista: Cliente[] = [];
  dato: any;

  producto?: Producto;
  productos: Producto[] = [];

  miFormulario: FormGroup = this.fb.group({
    idCliente: ['', Validators.required],
    fechaCompra: [''],
    detalles: this.fb.array([], Validators.required)
  });

  idProducto: FormControl = this.fb.control('', Validators.required );

  detalles: FormGroup = this.fb.group({
    idProducto: [''],
    cantidad: [''],
    valor: ['']
  });
  
  constructor(private fb: FormBuilder,
    private facturaService: FacturaService,
    public validarService: ValidarService,
    private router: Router,
    private autoCompleteService: AutoCompleteService,
    private clienteService: ClienteService,
    private productoService: ProductoService) {
    this.validarService.recibirFomulario(this.miFormulario);
  }

  autoComplete(){
    this.clienteService.get().subscribe(clientes => {
      this.clientes = clientes;

      this.filteredClientes = this.autoCompleteService.autoComplete(this.clientes, 'idCliente');
      this.filteredClientes?.subscribe( result => this.lista = result );
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent, tipo: string) {
    this.dato = event.option.value;
    this.autoCompleteService.opcionSeleccionada( this.dato, tipo );
  }

  productoSeleccionado(event: MatAutocompleteSelectedEvent){
    if(!event.option.value) {
      this.idProducto.reset();
    }else{
      this.producto = event.option.value
      this.idProducto.reset(this.producto?.id);
    }
  }

  ngOnInit(): void {
    this.init();
    this.productoService.get().subscribe( productos => this.productos = productos );
  }

  get detallesArr(): FormArray {
    return this.miFormulario.get('detalles') as FormArray;
  }

  addDetalles(){
    if(!this.producto){
      return;
    }
    this.detallesArr.push(new FormGroup({
      'idProducto': new FormControl(this.producto!.id, Validators.required),
      'cantidad': new FormControl(1, Validators.required),
      'valor': new FormControl(this.producto!.valor, Validators.required)
    }));
    this.idProducto.reset();
  }

  removeDetalles(index: number){
    this.detallesArr.removeAt(index);
  }

  init(){
    this.autoCompleteService.recibirForm(this.miFormulario);
    this.autoComplete();
  }

  consultar() {
    this.router.navigate(['user/factura/consultar-factura']);
  }

  guardar(){
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    var factura = new Factura();
    factura = this.miFormulario.value;
    factura.idCliente = this.dato.id;

    this.facturaService.post( factura )
      .subscribe( resp => {
        if (resp.ok !== false) {
          Swal.fire('Factura guardada correctamente', resp.error, 'success');
          this.miFormulario.reset();
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
    
    this.miFormulario.reset();
  }
}
