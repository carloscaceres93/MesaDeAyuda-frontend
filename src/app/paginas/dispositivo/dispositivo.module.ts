import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioComponent } from './servicio/servicio.component';
import { DispositivoRoutingModule } from './dispositivo-routing.module';


@NgModule({
  declarations: [
    ServicioComponent
  ],
  imports: [
    CommonModule,
    DispositivoRoutingModule
  ],
  exports: [
    ServicioComponent
  ]
})
export class DispositivoModule { }
