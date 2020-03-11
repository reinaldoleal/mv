import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../core/services/company/company.service';
import { Company } from 'src/app/shared/models/company/company.model';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public companies;

  estados = [
    {nome: 'Selecione o Estado', sigla: ''},
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
    {nome: 'Selecione o Tipo', sigla: ''},
    {nome: 'ESTADUAL', sigla: 'E'},
    {nome: 'MUNICIPAL', sigla: 'M'},
    {nome: 'FEDERAL', sigla: 'F'}
  ];

  public buscarPorTipo = '';
  public buscarPorEstado =  '';
  public paginaAtual = 1;

  constructor(
    private translateService: TranslateService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.companyService.getAll().subscribe(data => {
      this.companies = data;
    });
  }

  public deleteCompany(cnes: string) {
    this.companyService.deleteCompany(cnes).subscribe(data => {
      this.getAll();
    });
  }

  public getCompaniesByFilter() {
    const parms = {
      uf: this.buscarPorEstado ? this.buscarPorEstado.toUpperCase() : undefined,
      tp_gestao: this.buscarPorTipo ? this.buscarPorTipo.toUpperCase() : undefined
    };

    this.companyService.getCompaniesByFilter(parms).subscribe(data => {
      this.companies = data as Company[];
    });
  }

  public confirm(cnes) {
    swal.fire({
      title: this.translateService.instant('Exclusão do Item'),
      text: this.translateService.instant('Confirma a exclusão do item selecionado?'),
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
        this.companyService.deleteCompany(cnes).subscribe(data => {
          swal.fire(
            this.translateService.instant('Excluido!'),
            this.translateService.instant('Seu item foi excluido com sucesso.'),
            'success'
          );
          this.getAll();
        });
      }
    });
  }
}
