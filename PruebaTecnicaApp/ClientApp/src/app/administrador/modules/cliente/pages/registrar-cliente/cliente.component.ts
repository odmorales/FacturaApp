import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ValidarService } from '../../../../../shared/services/validar.service';
import { Cliente } from '../../class/cliente';

import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  cliente: Cliente;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    edad: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    public validarService: ValidarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.validarService.recibirFomulario(this.miFormulario);
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.clienteService.getId(id))
      )
      .subscribe(cliente => {
        this.cliente = cliente;
        this.miFormulario.reset(this.cliente);
    });
  }

  consultar() {
    this.router.navigate(['user/cliente/consultar-cliente']);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    if(this.cliente.id){
      this.editar();
    }else{
      var cliente = new Cliente();
      cliente = this.miFormulario.value;
  
      this.clienteService.post(cliente).subscribe(resp => {
        if (resp.ok !== false) {
          Swal.fire('Cliente guardado correctamente', resp.error, 'success');
          this.miFormulario.reset();
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
    }

  }

  editar() {

    var cliente = new Cliente();
    cliente = this.miFormulario.value;
    cliente.id = this.cliente.id;

    this.clienteService.put(cliente).subscribe(resp => {
      Swal.fire('Cliente modificado correctamente', resp.id, 'success');
      this.router.navigate(['user/cliente/consultar-cliente']);
    });
  }
}
