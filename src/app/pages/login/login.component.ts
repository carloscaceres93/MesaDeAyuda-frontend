import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public form: FormGroup = Object.create(null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      identificacion: [null, Validators.compose([Validators.required])],
      clave: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit(): void {

    console.log('Yeah?');

    let identificacion = this.form.value['identificacion'];
    let clave = this.form.value['clave'];

    this.loginService.login(identificacion, clave).subscribe(data => {

      sessionStorage.setItem(environment.NOMBRE_TOKEN, data.token);

      this.router.navigate(['/inicio']);

    }, err => {

      let estadoPeticion = err.status;
      console.log(err);

      if(estadoPeticion == 401 || estadoPeticion == 400) {
        console.log('Credenciales incorrectas');
      }
    });
    
  }
}
