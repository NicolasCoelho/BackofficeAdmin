import { Component, OnInit } from '@angular/core';

//Importando Router para Instanciamento no Constructor
import { Router } from '@angular/router';

//Importando Ws para uso dos Metodos e acessar a API
import { Ws } from 'src/app/_services/ws';

//Importando o Formbuilder, FormGroup, Validators para tratamento do Formulário
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Importando o modelo Store para instanciamento;
import { Store } from '../../_models/stores';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss'],
})
export class RegisterStoreComponent implements OnInit {
  //Definindo a variavel 'storeForm' do tipo FormGroup, para uso de Todos os Métodos do Módulo FormGroup
  public storeForm: FormGroup;

  //Comentei porque acredito que não irei Precisar;
  // public type = [
  //   {value: 1, viewValue: 'Core'} ?
  // ]

  //Definindo a variavel Status para definir os estados a serem mostrado em tela
  public status = [
    { value: 1, viewValue: 'Ativo' },
    { value: 2, viewValue: 'Manutenção' },
    { value: 3, viewValue: 'Desativado' },
  ];

  /**
   **** Definindo a variavel dentro do constructor
   *  / ws do tipo: Ws /
   *  / router do tipo: Router /
   *  / FormBuilder do tipo: FormBuilder /
   **** para ser gerada imediatamente quando a classe for chamada.
   * */

  constructor(
    private ws: Ws,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  /**
   *  Sempre que o Angular for Iniciado / ou a tela for Renderizada
   *  a variavel storeForm recebe o formBuilder com algumas
   *  propriedades, e valores pré definidos.
   */

  ngOnInit(): void {
    this.storeForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      status: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  register() {
    if (!this.storeForm.valid) {
      alert('Dados incorretos');
      return;
    }

    let env = new Store();
    // delete env.created_at;
    // delete env.updated_at;
    delete env.id;

    // env.type = this.storeForm.get('type').value;
    // env.password = this.storeForm.get('password').value;
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
