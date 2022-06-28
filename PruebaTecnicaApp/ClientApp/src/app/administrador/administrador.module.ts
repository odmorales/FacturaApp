import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../design/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrimeNgModule } from '../design/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PrimeNgModule
  ]
})
export class AdministradorModule { }
