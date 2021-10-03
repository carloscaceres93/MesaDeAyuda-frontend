import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let roles: string[] = route.data.roles;
    let respuesta = this.loginService.estaLogueado();

    if (!respuesta) {
      this.router.navigateByUrl("/login");
    } else {
      let rolLocal: string = this.loginService.obtenerRol();
      let contador: number = 0;
      roles.forEach(item => {
        if (item == rolLocal) {
          contador++;
        }
      });
      if (contador == 0) {
        this.router.navigateByUrl("/login");
      }
    }

    return respuesta;
  }
}
