import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../class/cliente';
import { ClienteService } from '../../services/cliente.service';

import { switchMap } from 'rxjs';
import { FacturaService } from '../../../factura/services/factura.service';
import { Factura } from '../../../factura/classes/factura';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styles: [
  ]
})
export class ConsultarClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  facturas: Factura[] = [];
  cliente?: Cliente;

  constructor(private clienteService: ClienteService,
              private facturaService: FacturaService,
              private router: Router) { }

  ngOnInit(): void {
    this.clienteService.get().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  registrar(){
    this.router.navigate(['user/cliente/registrar-cliente']);
  }

  eliminar(cliente: Cliente) {
    this.facturaService.get().subscribe(resp => {
      this.facturas = resp;
      if (this.facturas.find(factura => factura.idCliente == cliente.id)) {
         this.mensajeError();
      } else {
        this.clienteService.delete(cliente.id)
          .pipe(
            switchMap((_) => this.clienteService.get())
          )
          .subscribe(resp => this.clientes = resp);
      }
    });
  }

  mensajeError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Cliente esta asociado a una factura!'
    });
  }
}
