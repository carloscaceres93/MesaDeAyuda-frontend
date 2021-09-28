import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/oauth/token`
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD))
    });
  }

  estaLogueado() {
    let respuesta: boolean = false;
    let access_token: string =  sessionStorage.getItem(environment.TOKEN_NAME);

    if (access_token != null) {
      respuesta = !this.jwtHelper.isTokenExpired(access_token);
      if (!respuesta) {
        this.cerrarSesion();
      }
    }
    return respuesta;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(environment.TOKEN_NAME);
    this.router.navigate(['login']);
  }

  obtenerUsuario() {
    let access_token: string =  sessionStorage.getItem(environment.TOKEN_NAME);
    let usuario = this.jwtHelper.decodeToken(access_token).user_name;
    return usuario;
  }

  obtenerRol() {
    let access_token: string =  sessionStorage.getItem(environment.TOKEN_NAME);
    let role = this.jwtHelper.decodeToken(access_token).authorities[0];
    return role;
  }

}
