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
  public empresa: Empresa;
  public key: any;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.key = this.route.snapshot.params.id;

    if (this.key !== 'new') {
      // this.empresaService.getEmpresa(this.key).subscribe(data => {
      //   if (data) {
      //     this.empresa = data as User;
      //   }
      // });
    } else {
      this.empresa = {
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: ''
      };
    }
  }

  onSubmit() {
    if (this.key === 'new') {
      // this.empresaService.insert(this.empresa);
    } else {
      // this.userService.update(this.usuario, this.key);
    }
  }
}
