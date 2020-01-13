import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService
  ) { }

  public login(login: string) {
    if (this.userService.getUserByLogin(login)) {
      localStorage.setItem('ACCESS_TOKEN', 'access_token');
      localStorage.setItem('USER', login);
      return true;
    }

    return false;
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null && localStorage.getItem('USER') != null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER');
  }
}
