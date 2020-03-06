import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cnes-app';

  constructor(
    public translate: TranslateService,
    http: HttpClient
  ) {
    this.translate.addLangs(['pt-br', 'en', 'es']);
    this.translate.setDefaultLang('pt-br');
    this.translate.use('pt-br');
  }
}
