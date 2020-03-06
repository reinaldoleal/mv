import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/shared/models/empresa/empresa.model';
import { EmpresaService } from '../../../core/services/empresa/empresa.service';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EmpresaEditComponent implements OnInit {
  empresa: Empresa;
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
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.id !== 'new') {
      this.empresaService.getEmpresa(this.id).subscribe(data => {
        if (data) {
          this.empresa = data as Empresa;
        }
      });
    } else {
      // tslint:disable-next-line: new-parens
      this.empresa = {
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
      this.empresaService.createEmpresa(this.empresa).subscribe(data => {
        console.log(data);
      });
    } else {
      this.empresaService.updateEmpresa(this.empresa, this.id).subscribe(data => {
        console.log(data);
      });
    }
  }
}
