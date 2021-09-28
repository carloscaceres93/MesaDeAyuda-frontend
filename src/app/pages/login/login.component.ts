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
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  iniciarSesion(){
    this.loginService.login(this.form.value['uname'], this.form.value['password']).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

      this.router.navigate(['pages/inicio']);
    });
  }

  onSubmit(): void {
    this.router.navigate(['/inicio']);
  }
}
