import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/_guardia/admin.guard';
import { BuscarComponent } from './buscar/buscar.component';
import { GuardarComponent } from './guardar/guardar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'buscar',
    pathMatch: 'full'
  },
  {
    path: 'buscar',
    component: BuscarComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'nuevo',
    component: GuardarComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'modificar/:id',
    component: GuardarComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleRoutingModule { }
