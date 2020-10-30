import { Component, OnInit } from '@angular/core';

//Importando Router para Instanciamento no Constructor
import { Router } from '@angular/router';

//Importando Ws para uso dos Metodos e acessar a API
import { Ws } from 'src/app/_services/ws';

//Importando o Formbuilder, FormGroup, Validators para tratamento do Formulário
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Importando o modelo Store para instanciamento;
import { Store } from '../../_models/stores';
import { Enviroment } from 'src/app/_models/enviroments';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss'],
})
export class RegisterStoreComponent implements OnInit {
  public storeForm: FormGroup;
  public status = [
    { value: 1, viewValue: 'Ativo' },
    { value: 2, viewValue: 'Manutenção' },
    { value: 3, viewValue: 'Desativado' },
  ];
  public enviroments: Array<Enviroment> = [];

  constructor(
    private ws: Ws,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ws
      .getEnviroments()
      .then((r) => Object.assign(this.enviroments, r))
      .catch((e) => console.log(e));

    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required],
      enviroment_id: ['', Validators.required],
      status: ['', Validators.required],
      url: ['', Validators.required],
      website_id: ['', Validators.required],
      allow_register: ['', Validators.required],
      protected_register: ['', Validators.required],
      comission_type: ['', Validators.required],
      comission_value: ['', Validators.required],
      phone_1: ['', Validators.required],
      phone_2: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      pis: ['', Validators.required],
      rg: ['', Validators.required],
      birthdate: ['', Validators.required],
      nationality: ['', Validators.required],
      birt_location: ['', Validators.required],
      marital_status: ['', Validators.required],
      gender: ['', Validators.required],
      literacy: ['', Validators.required],
      cep: ['', Validators.required],
      adress: ['', Validators.required],
      adress_number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      bank: ['', Validators.required],
      agency: ['', Validators.required],
      account: ['', Validators.required],
      account_owner: ['', Validators.required],
      account_ownerCpf: ['', Validators.required],
      received: ['', Validators.required],
      completed: ['', Validators.required],
      canceled: ['', Validators.required],
      content: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      // name: ['', Validators.required],
      // status: ['', Validators.required],
    });
  }

  register() {
    if (!this.storeForm.valid) {
      alert('Dados incorretos');
      return;
    }

    let env = new Store();
    delete env.createdAt;
    delete env.updatedAt;
    delete env.id;

    env.name = this.storeForm.get('name').value;
    env.status = this.storeForm.get('status').value;
    env.url = this.storeForm.get('url').value;

    this.ws
      .createEnviroment(env)
      .then((response) => {
        alert('Cadastro realizado com sucesso');
        this.router.navigate(['dashboard']);
      })
      .catch((e) => console.log(e));
  }
}
