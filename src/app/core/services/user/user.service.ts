import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get('https://my-json-server.typicode.com/reinaldoleal/mv/boards');
  }

  public getUserByLogin(username: string) {
    return this.http.get('https://my-json-server.typicode.com/reinaldoleal/mv/boards/1');
  }

  public createUser(user: User) {
    return this.http.post('https://my-json-server.typicode.com/reinaldoleal/mv/boards', user);
  }

  public updateUser(user: User) {
    return this.http.put('https://my-json-server.typicode.com/reinaldoleal/mv/boards/' + user.username, user);
  }

  public deleteUser(user: User) {
    return this.http.delete('https://my-json-server.typicode.com/reinaldoleal/mv/boards/' + user.username);
  }
}
