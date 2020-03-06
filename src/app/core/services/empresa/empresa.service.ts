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
    return this.http.get('http://localhost:3000/empresas');
  }

  public getEmpresa(id: string) {
    return this.http.get('http://localhost:3000/empresas/' + id);
  }

  public getEmpresasByFilter(params) {
    let filter;

    if (params.uf) {
      filter = 'uf=' + params.uf;
    }

    if (params.natJuridica) {
      if (filter !== '') {
        filter = filter + '&';
      }

      filter = filter + 'natJuridica=' + params.natJuridica;
    }

    if (filter) {
      return this.http.get('http://localhost:3000/empresas?' + filter);
    } else {
      return this.getAll();
    }
  }

  public createEmpresa(empresa: Empresa) {
    return this.http.post('http://localhost:3000/empresas', empresa);
  }

  public updateEmpresa(empresa: Empresa, key: string) {
    return this.http.put('http://localhost:3000/empresas/' + empresa.id, empresa);
  }

  public deleteEmpresa(id: string) {
    return this.http.delete('http://localhost:3000/empresas/' + id);
  }
}
