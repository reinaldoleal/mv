import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/shared/models/company/company.model';
import { CompanyService } from '../../../core/services/company/company.service';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-company-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  company: Company;
  public id: any;

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

  public tipos = [
    {nome: 'ESTADUAL', sigla: 'E'},
    {nome: 'MUNICIPAL', sigla: 'M'},
    {nome: 'FEDERAL', sigla: 'F'}
  ];

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.cnes;

    if (this.id !== 'new') {
      this.companyService.getCompany(this.id).subscribe(data => {
        if (data) {
          this.company = data as Company;
        }
      });
    } else {
      this.company = {
        id: null,
        co_cnes: null,
        co_ibge: null,
        no_fantasia: '',
        ds_tipo_unidade: '',
        tp_gestao: '',
        no_logradouro: '',
        nu_endereco: '',
        no_bairro: '',
        co_cep: null,
        uf: '',
        municipio: '',
        nu_telefone: ''
      };
    }
  }

  public onSubmit() {
    swal.fire({
      title: this.translateService.instant(this.id === 'new' ? 'add' : 'update'),
      text: this.translateService.instant(this.id === 'new' ? 'do you confirm to the company' : 'do you confirm the company change'),
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: this.translateService.instant('yes'),
      cancelButtonColor: '#d33',
      cancelButtonText: this.translateService.instant('no'),
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (this.id === 'new') {
          this.companyService.createCompany(this.company).subscribe(data => {
            swal.fire(
              this.translateService.instant('added'),
              this.translateService.instant('the company was successfully included'),
              'success'
            );
          });
        } else {
          this.companyService.updateCompany(this.company).subscribe(data => {
            swal.fire(
              this.translateService.instant('updated'),
              this.translateService.instant('successfully changed data'),
              'success'
            );
          });
        }
      }
    });
  }

}
