import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemStatusAndTypes } from 'src/app/_models/systemStatus';
import { Ws } from 'src/app/_services/ws';

import { Enviroment } from '../../_models/enviroments';

@Component({
  selector: 'app-register-enviroment',
  templateUrl: './register-enviroment.component.html',
  styleUrls: ['./register-enviroment.component.scss'],
})
export class RegisterEnviromentComponent implements OnInit {

  public enviromentForm: FormGroup;

  public types = [{ value: 1, viewValue: 'Core' }];
  public status: Array<SystemStatusAndTypes> = [];
  public enviroment: Enviroment = new Enviroment()
  public isEdit: boolean = false;
  public loading: boolean = false;

  constructor(
    private ws: Ws,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.getStatus()
    this.getTypes()
    if (this.router.url.indexOf('edit') > -1) {
      this.isEdit = true;
      this.loading = true
      this.currentRoute.params.subscribe(param => {
        this.ws.getEnviroment(param.id).then(
          response => {
            Object.assign(this.enviroment, response)
          }
        ).finally(() => this.loading = false)
      })
    }
  }

  ngOnInit(): void {
    this.enviromentForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      url: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getStatus() {
    this.ws.getSystemStatusByType('ENVIROMENT').then(
      response => {
        Object.assign(this.status, response)
      }
    )
  }

  getTypes() {
    this.ws.getSystemTypesByType('ENVIROMENT').then(
      response => {
        Object.assign(this.types, response)
      }
    )
  }

  register() {
    if (this.isEdit) this.enviromentForm.get('password').disable()

    if (!this.enviromentForm.valid) {
      alert('Dados incorretos');
      return;
    }

    this.loading = true;
    if (this.isEdit) {
      delete this.enviroment.createdAt
      delete this.enviroment.updatedAt
      const id = this.enviroment.id
      delete this.enviroment.id
      this.ws.changeEnviroment(id, this.enviroment)
        .catch((e)=> alert("Erro inesperado") )
        .finally(()=>{
          this.loading = false;
          alert("Ambiente editado com sucesso!");
        })
    } else {
      this.ws
      .createEnviroment(this.enviroment)
      .then((response) => {
        alert('Cadastro realizado com sucesso');
        this.router.navigate(['dashboard']);
      })
      .catch((e) => console.log(e));
    }
  }
}
