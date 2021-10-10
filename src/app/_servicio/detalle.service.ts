import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Detalle } from '../_modelo/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private url: String = `${environment.HOST}/configuracion/detalle`;

  constructor(
    private http: HttpClient
  ) { }

  buscarPorMaestro(id: number): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(`${this.url}/${id}/maestro`)
  }

  buscarPorId(id: number): Observable<Detalle> {
    return this.http.get<Detalle>(`${this.url}/${id}`);
  }

  modificar(detalle: Detalle): Observable<any> {
    return this.http.put(`${this.url}/`, detalle);
  }

  crear(detalle: Detalle): Observable<any> {
    return this.http.post(`${this.url}/`, detalle);
  }
}
