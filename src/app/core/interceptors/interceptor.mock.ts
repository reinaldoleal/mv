import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as users from '../../shared/mock/users.json';

const urls = [
    {
        url: 'https://my-json-server.typicode.com/reinaldoleal/mv/boards',
        json: users
    }
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const element of urls) {
            if (request.url === element.url) {
                console.log('Loaded from json : ' + request.url);
                return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
            }
        }
        console.log('Loaded from http call :' + request.url);
        return next.handle(request);
    }
}
