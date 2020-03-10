import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/shared/models/company/company.model';
import { CompanyService } from '../../../core/services/company/company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company: Company;
  id: any;

  estados = [
    {nome: 'Acre', sigla: 'AC'},
    {nome: 'Alagoas', sigla: 'AL'},
    {nome: 'Amapá', sigla: 'AP'},
    {nome: 'Amazonas', sigla: 'AM'},
    {nome: 'Bahia', sigla: 'BA'},
    {nome: 'Ceará', sigla: 'CE'},
    {nome: 'Distrito Federal', sigla: 'DF'},
    {nome: 'Espírito Santo', sigla: 'ES'},
    {nome: 'Goiás', sigla: 'GO'},
    {nome: 'Maranhão', sigla: 'MA'},
    {nome: 'Mato Grosso', sigla: 'MT'},
    {nome: 'Mato Grosso do Sul', sigla: 'MS'},
    {nome: 'Minas Gerais', sigla: 'MG'},
    {nome: 'Pará', sigla: 'PA'},
    {nome: 'Paraíba', sigla: 'PB'},
    {nome: 'Paraná', sigla: 'PR'},
    {nome: 'Pernambuco', sigla: 'PE'},
    {nome: 'Piauí', sigla: 'PI'},
    {nome: 'Rio de Janeiro', sigla: 'RJ'},
    {nome: 'Rio Grande do Norte', sigla: 'RN'},
    {nome: 'Rio Grande do Sul', sigla: 'RS'},
    {nome: 'Rondônia', sigla: 'RO'},
    {nome: 'Roraima', sigla: 'RR'},
    {nome: 'Santa Catarina', sigla: 'SC'},
    {nome: 'São Paulo', sigla: 'SP'},
    {nome: 'Sergipe', sigla: 'SE'},
    {nome: 'Tocantins', sigla: 'TO'}
  ];

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.id !== 'new') {
      this.companyService.getCompany(this.id).subscribe(data => {
        if (data) {
          this.company = data as Company;
        }
      });
    } else {
      // tslint:disable-next-line: new-parens
      this.company = {
        id: 0,
        cnes: '',
        noFantasia: '',
        noEmpresarial: '',
        uf: '',
        noMunicipio: '',
        gestao: '',
        natJuridica: 0,
        atendeSus: ''
      };
    }
  }

  onSubmit() {
    if (this.id === 'new') {
      this.companyService.createCompany(this.company).subscribe(data => {
        console.log(data);
      });
    } else {
      this.companyService.updateCompany(this.company, this.id).subscribe(data => {
        console.log(data);
      });
    }
  }
}
