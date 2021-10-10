import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Detalle } from 'src/app/_modelo/detalle';
import { Maestro } from 'src/app/_modelo/maestro';
import { DetalleService } from 'src/app/_servicio/detalle.service';
import { MaestroService } from 'src/app/_servicio/maestro.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements AfterViewInit {

  maestros: Maestro[] = [];
  ocultarSeccionTabla = true;
  columnasMostradas: string[] = ['nombre', 'habilitado', 'modificar'];
  fuenteDatos: MatTableDataSource<Detalle>;

  @ViewChild(MatPaginator) paginador: MatPaginator;
  @ViewChild(MatSort) ordenador: MatSort;

  constructor(
    private servicioMaestro: MaestroService,
    private servicioDetalle: DetalleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fuenteDatos = new MatTableDataSource([]);
  }

  ngAfterViewInit(): void {
    this.buscarMaestroEditable();
  }

  private buscarMaestroEditable(): void {
    this.servicioMaestro.buscarEditables().subscribe(maestros => {
      this.maestros = maestros;
    });
  }

  seleccionCategoriaCambio(evento: MatSelectChange): void {
    let maestroId: number = evento.value;
    this.servicioDetalle.buscarPorMaestro(maestroId).subscribe(detalles => {
      this.fuenteDatos = new MatTableDataSource(detalles);
      this.fuenteDatos.paginator = this.paginador;
      this.fuenteDatos.sort = this.ordenador;
      this.ocultarSeccionTabla = false;
    });
  }

  aplicarFiltro(event: Event): void {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.fuenteDatos.filter = valorFiltro.trim().toLowerCase();

    if (this.fuenteDatos.paginator) {
      this.fuenteDatos.paginator.firstPage();
    }
  }

  redireccionarAModificar(detalle: Detalle): void {
    this.router.navigate([`../modificar/${detalle.id}`], {relativeTo: this.route});
  }

}