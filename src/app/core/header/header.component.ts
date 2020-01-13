import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLang;

  constructor(
    public translate: TranslateService
  ) {
    this.currentLang = translate.currentLang;
  }

  ngOnInit() {
    console.log(this.currentLang);
  }

  changeLanguage(l) {
    this.translate.use(l);
    this.currentLang = l;
  }

}
