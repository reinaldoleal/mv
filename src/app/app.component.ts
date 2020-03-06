import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/models/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usuario-app';
  users = [];

  constructor(
    public translate: TranslateService,
    http: HttpClient
  ) {
    this.translate.addLangs(['pt-br', 'en', 'es']);
    this.translate.setDefaultLang('pt-br');
    this.translate.use('pt-br');

    http.get<[User]>('https://my-json-server.typicode.com/reinaldoleal/mv/boards').subscribe( res => {
        this.users = res;

        console.log(this.users);
    });
  }
}
