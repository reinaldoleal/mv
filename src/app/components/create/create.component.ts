import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formUser: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get formControls() {
    return this.formUser.controls;
  }

  createForm() {
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formUser.invalid) {
      return;
    }

    if (this.userService.createUser(this.formUser.value)) {
      this.router.navigateByUrl('/login');
    }
  }

}
