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

  public getCompany(id: string) {
    return this.http.get('/api/company/' + id);
  }

  public getCompaniesByFilter(params) {
    let filter = '';

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
      return this.http.get('/api/company?' + filter);
    } else {
      return this.getAll();
    }
  }

  public createCompany(company: Company) {
    return this.http.post('/api/company', company);
  }

  public updateCompany(company: Company, key: string) {
    return this.http.put('/api/company/' + company.id, company);
  }

  public deleteCompany(id: string) {
    return this.http.delete('/api/company/' + id);
  }
}
