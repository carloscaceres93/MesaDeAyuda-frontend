import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/_guardia/admin.guard';

const routes: Routes = [
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then(d => d.DetalleModule),
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
