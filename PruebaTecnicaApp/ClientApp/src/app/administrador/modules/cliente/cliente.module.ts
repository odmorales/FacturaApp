import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './pages/registrar-cliente/cliente.component';
import { ConsultarClienteComponent } from './pages/consultar-cliente/consultar-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/design/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../../../design/prime-ng.module';


@NgModule({
  declarations: [
    ClienteComponent,
    ConsultarClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    PrimeNgModule
  ]
})
export class ClienteModule { }
