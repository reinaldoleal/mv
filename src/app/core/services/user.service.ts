import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users;

  constructor(
    private http: HttpClient
  ) {
    this.users = [];
  }

  public createUser(user: User) {
    this.users.push(user);

    return true;
  }

  public getUserByLogin(username: string) {
    console.log(this.users);

    if (this.users.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.users.length; i++) {
        if (username === this.users[i].username) {
          return this.users[i];
        }
      }
    }

    return false;
  }

  public changeEmail(u: string, user: User) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.users.length; i++) {
      if (u === this.users[i].username) {
          this.users[i].email = user.email;
          return true;
      }
    }

    return false;
  }
}
