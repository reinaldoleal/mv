import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresaService } from '../../core/services/empresa/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  public empresas;

  public buscarPorCNPJ = '';
  public buscarPorRazaoSocial =  '';

  constructor(
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.buscarEmpresas();
  }

  buscarEmpresas() {
    this.empresas = this.empresaService.getAll();
  }

  delete(key: string) {
    this.empresaService.deleteEmpresa(key);
  }
}
