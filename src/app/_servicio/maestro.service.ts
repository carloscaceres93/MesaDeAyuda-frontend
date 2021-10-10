import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Maestro } from '../_modelo/maestro';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  private url: String = `${environment.HOST}/configuracion/maestro`;

  constructor(
    private http: HttpClient
  ) { }

  buscarEditables(): Observable<Maestro[]> {
    return this.http.get<Maestro[]>(`${this.url}/editable`);
  }
}
