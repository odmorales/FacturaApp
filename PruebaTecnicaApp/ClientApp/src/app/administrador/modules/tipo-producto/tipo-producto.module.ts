import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProductoRoutingModule } from './tipo-producto-routing.module';
import { RegistrarTipoComponent } from './pages/registrar-tipo/registrar-tipo.component';
import { ConsultarTipoComponent } from './pages/consultar-tipo/consultar-tipo.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/design/material.module';
import { PrimeNgModule } from '../../../design/prime-ng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistrarTipoComponent,
    ConsultarTipoComponent
  ],
  imports: [
    CommonModule,
    TipoProductoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    PrimeNgModule,
    FlexLayoutModule
  ]
})
export class TipoProductoModule { }
