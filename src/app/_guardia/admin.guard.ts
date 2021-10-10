import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { pagina } from '../shared/pagina';
import { role } from '../shared/role';
import { LoginService } from '../_servicio/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private servicioLogin: LoginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let tienePermisos = this.servicioLogin.tieneRole(role.admin);

    if (tienePermisos) {
      return true;
    }

    this.router.navigate([pagina.sinAutorizacion]);

    return false;
  }

}
