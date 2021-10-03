import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MaterialModule
  ],
  exports: [
  ]
})
export class ConfiguracionModule { }
