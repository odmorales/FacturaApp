import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ConsultarProductoComponent } from './pages/consultar-producto/consultar-producto.component';
import { RegistrarProductoComponent } from './pages/registrar-producto/registrar-producto.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/design/material.module';
import { PrimeNgModule } from '../../../design/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConsultarProductoComponent,
    RegistrarProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class ProductoModule { }
