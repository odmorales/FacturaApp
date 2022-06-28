import { Component, OnInit } from '@angular/core';

import { TipoProducto } from '../../class/tipo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ValidarService } from 'src/app/shared/services/validar.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-registrar-tipo',
  templateUrl: './registrar-tipo.component.html',
  styles: [
  ]
})
export class RegistrarTipoComponent implements OnInit {

  categoria: TipoProducto;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['']
  });

  constructor(private fb: FormBuilder,
    private categoriaService: CategoriaService,
    public validarService: ValidarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.validarService.recibirFomulario(this.miFormulario);
    this.categoria = new TipoProducto();
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.categoriaService.getId(id))
      )
      .subscribe(categoria => {
        this.categoria = categoria;
        console.log(this.categoria);
        this.miFormulario.reset(this.categoria);
      });
  }

  consultar() {
    this.router.navigate(['user/categoria/consultar-tipo']);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    if(this.categoria.id){
      this.editar();
    }else{
      var categoria = new TipoProducto();
      categoria = this.miFormulario.value;
  
      this.categoriaService.post(categoria).subscribe(resp => {
        if (resp.ok !== false) {
          Swal.fire('Categoria guardado correctamente', resp.error, 'success');
          this.miFormulario.reset();
        } else {
          Swal.fire('Error', resp.error, 'error');
        }
      });
    }

  }

  editar() {

    var categoria = new TipoProducto();
    categoria = this.miFormulario.value;
    categoria.id = this.categoria.id;

    this.categoriaService.put(categoria).subscribe(resp => {
      Swal.fire('Categoria modificado correctamente', resp.id, 'success');
      this.router.navigate(['user/categoria/consultar-categoria']);
    });
  }
}
