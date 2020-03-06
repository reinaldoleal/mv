import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa/empresa.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get('https://my-json-server.typicode.com/reinaldoleal/mv/boards');
  }

  public getEmpresa(cnpj: string) {
    return this.http.get('https://my-json-server.typicode.com/reinaldoleal/mv/boards/' + cnpj);
  }

  public createEmpresa(empresa: Empresa) {
    return this.http.post('https://my-json-server.typicode.com/reinaldoleal/mv/boards', empresa);
  }

  public updateEmpresa(empresa: Empresa, key: string) {
    return this.http.put('https://my-json-server.typicode.com/reinaldoleal/mv/boards/' + empresa.cnpj, empresa);
  }

  public deleteEmpresa(cnpj: string) {
    return this.http.delete('https://my-json-server.typicode.com/reinaldoleal/mv/boards/' + cnpj);
  }
}
