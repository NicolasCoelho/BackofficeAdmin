import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public status = [
    { value: 1, viewValue: 'Ativo' },
    { value: 2, viewValue: 'Manutenção' },
    { value: 3, viewValue: 'Desativado' },
  ];

  constructor(
    private ws: Ws,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.enviromentForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      url: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (!this.enviromentForm.valid) {
      alert('Dados incorretos');
      return;
    }

    let env = new Enviroment();
    delete env.created_at;
    delete env.updated_at;
    delete env.id;

    env.name = this.enviromentForm.get('name').value;
    env.type = this.enviromentForm.get('type').value;
    env.status = this.enviromentForm.get('status').value;
    env.url = this.enviromentForm.get('url').value;
    env.password = this.enviromentForm.get('password').value;

    this.ws
      .createEnviroment(env)
      .then((response) => {
        alert('Cadastro realizado com sucesso');
        this.router.navigate(['dashboard']);
      })
      .catch((e) => console.log(e));
  }
}
