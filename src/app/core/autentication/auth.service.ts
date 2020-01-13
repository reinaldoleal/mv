import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService
  ) { }

  login(username: string) {
    const user = this.userService.getUserByLogin(username);
    if (user) {
      localStorage.setItem('ACCESS_TOKEN', 'access_token');
      localStorage.setItem('USER', username);
      return user;
    }

    return false;
  }

  isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null && localStorage.getItem('USER') != null;
  }

  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER');
  }
}
