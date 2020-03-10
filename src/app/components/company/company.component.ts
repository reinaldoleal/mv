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

  public deleteCompany(id: string) {
    this.companyService.deleteCompany(id).subscribe(data => {
      this.getAll();
    });
  }

  public getCompaniesByFilter() {
    const parms = {
      uf: this.buscarPorEstado ? this.buscarPorEstado.toUpperCase() : this.buscarPorEstado,
      natJuridica: this.buscarPorTipo
    };

    this.companyService.getCompaniesByFilter(parms).subscribe(data => {
      this.companies = data as Company[];
    });
  }

  public confirm(id) {
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
        this.companyService.deleteCompany(id).subscribe(data => {
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
