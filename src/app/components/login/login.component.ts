import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/autentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formLogin  =  this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.formLogin.controls;
  }

  loginIn() {
    this.isSubmitted = true;

    if (this.formLogin.invalid) {
      return;
    }

    this.authService.login(this.formLogin.value);
    this.router.navigateByUrl('/dashboard');
  }
}
