import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/seguridad/inicio-sesion/generar-token`
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario: string, clave: string) {
    let json = {
      usuario: usuario,
      clave: clave
    }
    return this.http.post<any>(this.url, json);
  }

  estaLogueado() {
    let respuesta: boolean = false;
    let access_token: string = sessionStorage.getItem(environment.NOMBRE_TOKEN);

    if (access_token != null) {
      respuesta = !this.jwtHelper.isTokenExpired(access_token);
      if (!respuesta) {
        this.cerrarSesion();
      }
    }
    return respuesta;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(environment.NOMBRE_TOKEN);
    this.router.navigate(['login']);
  }

  obtenerUsuario() {
    let access_token: string = sessionStorage.getItem(environment.NOMBRE_TOKEN);
    let usuario = this.jwtHelper.decodeToken(access_token).user_name;
    return usuario;
  }

  obtenerRol() {
    let access_token: string = sessionStorage.getItem(environment.NOMBRE_TOKEN);
    if(access_token == null) {
      return [];
    }
    let role = this.jwtHelper.decodeToken(access_token).authorities;
    return role;
  }

  tieneRole(role: String) {
    let roles: String[] = this.obtenerRol();
    return roles.includes(role);
  }

}
