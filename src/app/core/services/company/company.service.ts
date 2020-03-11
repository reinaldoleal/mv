import { Injectable } from '@angular/core';
import { Company } from 'src/app/shared/models/company/company.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll() {
    return this.http.get('/api/company');
  }

  public getCompany(cnes: string) {
    return this.http.get('/api/company/' + cnes);
  }

  public getCompaniesByFilter(params) {
    let filter = '';

    if (params.uf) {
      filter = 'uf=' + params.uf;
    }

    if (params.tp_gestao) {
      if (filter !== '') {
        filter = filter + '&';
      }

      filter = filter + 'tp_gestao=' + params.tp_gestao;
    }

    if (filter) {
      return this.http.get('/api/company?' + filter);
    } else {
      return this.getAll();
    }
  }

  public createCompany(company: Company) {
    company.id = company.co_cnes;

    return this.http.post('/api/company', company);
  }

  public updateCompany(company: Company) {
    return this.http.put('/api/company/' + company.co_cnes, company);
  }

  public deleteCompany(cnes: string) {
    return this.http.delete('/api/company/' + cnes);
  }
}
