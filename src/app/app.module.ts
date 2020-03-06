import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EmpresaEditComponent } from './components/empresas/edit/edit.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { environment } from '../environments/environment';

import { HttpRequestInterceptor } from './core/interceptors/interceptor';
import { HttpMockRequestInterceptor } from './core/interceptors/interceptor.mock';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPaginationModule } from 'ngx-pagination';

export const isMock = environment.mock;

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'empresa'
  },
  {
    path: 'empresa',
    component: EmpresasComponent
  },
  {
    path: 'empresa/:id',
    component: EmpresaEditComponent
  },
  {
    path: 'empresa/new',
    component: EmpresaEditComponent
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmpresasComponent,
    EmpresaEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
