import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFiltroComponent } from './components/input-filtro/input-filtro.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from 'src/app/design/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrimeNgModule } from '../../../design/prime-ng.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InputFiltroComponent,
    SpinnerComponent   
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PrimeNgModule,
    FlexLayoutModule,
  ],
  exports: [
    InputFiltroComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
