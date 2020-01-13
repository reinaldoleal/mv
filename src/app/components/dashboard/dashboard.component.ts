import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from 'src/app/core/autentication/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formUser: FormGroup;
  isSubmitted = false;

  public user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    this.user = {
      name: 'REINALDO LEAL DE AZEVEDO FILHO',
      login: 'reinaldoleal',
      email: 'reinaldoleal@gmail.com',
      password: '123456'
    };
    this.createForm();
  }

  get formControls() {
    return this.formUser.controls;
  }

  createForm() {
    this.formUser = this.formBuilder.group({
      name: [{ value: this.user.name, disabled: true }],
      login: [{ value: this.user.login, disabled: true }],
      email: [this.user.email, Validators.required],
      password: [{ value: this.user.password, disabled: true }]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formUser.invalid) {
      return;
    }

    if (this.userService.changeEmail(this.formUser.value)) {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
