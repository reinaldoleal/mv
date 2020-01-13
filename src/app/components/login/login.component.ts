import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/autentication/auth.service';
import { User } from 'src/app/shared/models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isSubmitted = false;
  isInvalidLogin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formLogin  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() {
    return this.formLogin.controls;
  }

  loginIn() {
    this.isInvalidLogin = false;
    this.isSubmitted = true;

    if (this.formLogin.invalid) {
      return;
    }

    const user = this.authService.login(this.formLogin.controls.username.value);

    console.log(user);

    if (user && user['password'] === this.formLogin.controls.password.value) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.isInvalidLogin = true;
    }
  }
}
