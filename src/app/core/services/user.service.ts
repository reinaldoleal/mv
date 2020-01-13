import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLogged;

  constructor(
    private http: HttpClient
  ) {
    this.isLogged = false;
  }

  public setLogged() {
    this.isLogged = true;
  }

  public getLogged() {
    return this.isLogged;
  }

  public createUser(user: User) {
    return true;
  }

  public getUserByLogin(user: User) {

  }

  public changeEmail(user: User) {
    return true;
  }
}
