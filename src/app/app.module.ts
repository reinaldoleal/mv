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
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './core/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './core/services/user/user.service';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EmpresaEditComponent } from './components/empresas/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { environment } from '../environments/environment';

import { HttpRequestInterceptor } from './core/interceptors/interceptor';
import { HttpMockRequestInterceptor } from './core/interceptors/interceptor.mock';

export const isMock = environment.mock;

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'empresa'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'empresa',
    component: EmpresasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'empresa/:id',
    component: EmpresaEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'empresa/new',
    component: EmpresaEditComponent,
    canActivate: [AuthGuard]
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    CreateComponent,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [UserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? HttpMockRequestInterceptor : HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
