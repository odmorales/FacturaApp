import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DxListModule, DxToolbarModule, DxSelectBoxModule, DxTemplateModule,
} from 'devextreme-angular';
import { DxFormModule } from "devextreme-angular";
import { DxLoadIndicatorModule } from "devextreme-angular";
import { DxResponsiveBoxModule } from 'devextreme-angular';
import { DxBoxModule } from 'devextreme-angular';

@NgModule({
  exports: [
    DxToolbarModule,
    DxListModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxResponsiveBoxModule,
    DxBoxModule
  ]
})
export class DvextremeModule { }
