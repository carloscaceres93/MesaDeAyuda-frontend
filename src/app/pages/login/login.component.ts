import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  errorMsg = '';
  signupForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl('Watson', Validators.required),
      password: new FormControl('12345678', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  signin(){

  }

  onSubmit() {
    if (!this.signinForm.invalid) {
      // do what you wnat with your data
      console.log(this.signinForm.value);
    }
  }
}
