import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresaService } from '../../core/services/empresa/empresa.service';
import { Empresa } from 'src/app/shared/models/empresa/empresa.model';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public empresas;

  public buscarPorTipo = '';
  public buscarPorEstado =  '';
  public paginaAtual = 1;

  constructor(
    private translateService: TranslateService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  public getAll() {
    this.empresaService.getAll().subscribe(data => {
      this.empresas = data;
    });
  }

  public deleteEmpresa(id: string) {
    this.empresaService.deleteEmpresa(id).subscribe(data => {
      this.getAll();
    });
  }

  public getEmpresasByFilter() {
    const parms = {
      uf: this.buscarPorEstado ? this.buscarPorEstado.toUpperCase() : this.buscarPorEstado,
      natJuridica: this.buscarPorTipo
    };

    this.empresaService.getEmpresasByFilter(parms).subscribe(data => {
      this.empresas = data as Empresa[];
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
        this.empresaService.deleteEmpresa(id).subscribe(data => {
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
