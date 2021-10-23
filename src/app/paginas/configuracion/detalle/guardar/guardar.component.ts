import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Detalle } from 'src/app/_modelo/detalle';
import { Maestro } from 'src/app/_modelo/maestro';
import { DetalleService } from 'src/app/_servicio/detalle.service';
import { MaestroService } from 'src/app/_servicio/maestro.service';

@Component({
  selector: 'app-guardar',
  templateUrl: './guardar.component.html',
  styleUrls: ['./guardar.component.scss']
})
export class GuardarComponent implements OnInit {

  esModoEditar: boolean = false;
  maestros: Maestro[] = [];
  form: FormGroup;

  @ViewChild('directivaForm')
  directivaForm: FormGroupDirective;

  constructor(
    private route: ActivatedRoute,
    private servicioDetalle: DetalleService,
    private servicioMaestro: MaestroService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.consultarMaestro();
    this.constuirFormulario();
    this.obtenerIdDetalleYConsultar();
  }

  private consultarMaestro(): void {
    this.spinner.show();

    this.servicioMaestro.buscarEditables().subscribe(maestros => {
      this.maestros = maestros;
      this.spinner.hide();
    });
  }

  private constuirFormulario(): void {
    this.form = this.fb.group({
      id: new FormControl(),
      valor: new FormControl('', [Validators.required]),
      maestroId: new FormControl('', [Validators.required]),
      habilitado: this.crearFormControlHabilitado()
    });
  }

  private crearFormControlHabilitado(): FormControl {

    if (this.esModoEditar) {

      return new FormControl('', [Validators.required]);
    }

    return new FormControl(true);
  }

  private obtenerIdDetalleYConsultar(): void {
    this.route.params.subscribe(parametros => {

      if (parametros.id) {
        this.esModoEditar = true;
        this.consultarDetalle(parametros.id);
      }

    });
  }

  private consultarDetalle(id: number): void {
    this.spinner.show();

    this.servicioDetalle.buscarPorId(id).subscribe(detalle => {
      this.llenarFormulario(detalle);
      this.spinner.hide();
    });
  }

  private llenarFormulario(detalle: Detalle): void {
    this.form.patchValue({
      id: detalle.id,
      valor: detalle.valor,
      maestroId: detalle.maestro_id,
      habilitado: detalle.habilitado
    });
  }

  enviarFormulario(): void {

    if (this.esModoEditar) {

      this.modificarDetalle();

    } else {

      this.crearNuevoDetalle();
    }

  }

  private modificarDetalle(): void {
    let detalle: Detalle = this.armarDetalle();

    this.servicioDetalle.modificar(detalle).subscribe(() => {
      this.snackBar.open('Detalle modificado exitosamente', '', { duration: 5000 });
      this.router.navigate(['configuracion/detalle/buscar']);
    });
  }

  private crearNuevoDetalle(): void {
    let detalle: Detalle = this.armarDetalle();

    this.servicioDetalle.crear(detalle).subscribe(() => {
      this.snackBar.open('Detalle creado exitosamente', '', { duration: 5000 });
      this.limpiarFormulario();
    });
  }

  private limpiarFormulario(): void {
    this.directivaForm.resetForm();
    this.constuirFormulario();
  }

  private armarDetalle(): Detalle {

    let detalle: Detalle = new Detalle();
    detalle.id = this.form.get('id').value;
    detalle.valor = this.form.get('valor').value;
    detalle.maestro_id = this.form.get('maestroId').value;
    detalle.habilitado = this.form.get('habilitado').value;

    return detalle;
  }

}
