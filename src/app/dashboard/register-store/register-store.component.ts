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
import { UserRequirements } from 'src/app/_models/user_requirements';
import { SaleStatus } from 'src/app/_models/sales_status';
import { Contract } from 'src/app/_models/contract';
import { User } from 'src/app/_models/user';

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
      storeName: ['', Validators.required],
      storeEnv: ['', Validators.required],
      storeStatus: ['', Validators.required],
      storeUrl: ['', Validators.required],
      storeWebsite: ['', Validators.required],
      storeAllowRegister: ['', Validators.required],
      storeProtectedRegister: ['', Validators.required],
      storeComissionType: ['', Validators.required],
      storeComissionValue: ['', Validators.required],
      reqPhone1: ['', Validators.required],
      reqPhone2: ['', Validators.required],
      reqCpfCnpj: ['', Validators.required],
      reqPis: ['', Validators.required],
      reqRg: ['', Validators.required],
      reqBirthDate: ['', Validators.required],
      reqNationality: ['', Validators.required],
      reqBirthLocation: ['', Validators.required],
      reqMaritalStatus: ['', Validators.required],
      reqGender: ['', Validators.required],
      reqLiteracy: ['', Validators.required],
      reqCep: ['', Validators.required],
      reqAdress: ['', Validators.required],
      reqAdressNumber: ['', Validators.required],
      reqNeighborhood: ['', Validators.required],
      reqCity: ['', Validators.required],
      reqState: ['', Validators.required],
      reqBank: ['', Validators.required],
      reqAgency: ['', Validators.required],
      reqAccount: ['', Validators.required],
      reqAccountOwner: ['', Validators.required],
      reqAccountOwnerCpf: ['', Validators.required],
      saleReceived: ['', Validators.required],
      saleCompleted: ['', Validators.required],
      saleCanceled: ['', Validators.required],
      contract: ['', Validators.required],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userEmail: ['', Validators.required],
    });
  }

  register() {
    // if (!this.storeForm.valid) {
    //   alert('Dados incorretos');
    //   return;
    // }

    let store = new Store();
    let req = new UserRequirements()
    let sale = new SaleStatus()
    let contract = new Contract()
    let user = new User()

    store.name = this.storeForm.get('storeName').value;
    store.allow_register = this.storeForm.get('storeAllowRegister').value;
    store.status = this.storeForm.get('storeStatus').value;
    store.url = this.storeForm.get('storeUrl').value;
    store.enviroment_id = this.storeForm.get('storeEnv').value;
    store.website_id = this.storeForm.get('storeWebsite').value;
    store.protected_register = this.storeForm.get('storeProtectedRegister').value;
    store.comission_type = this.storeForm.get('storeComissionType').value;
    store.comission_value = this.storeForm.get('storeComissionValue').value;

    req.phone_1 = this.storeForm.get('reqPhone1').value;
    req.phone_2 = this.storeForm.get('reqPhone2').value;
    req.pis = this.storeForm.get('reqPis').value;
    req.rg = this.storeForm.get('reqRg').value;
    req.account = this.storeForm.get('reqAccount').value;
    req.account_owner = this.storeForm.get('reqAccountOwner').value;
    req.account_ownerCpf = this.storeForm.get('reqAccountOwnerCpf').value;
    req.agency = this.storeForm.get('reqAgency').value;
    req.bank = this.storeForm.get('reqBank').value;
    req.birth_location = this.storeForm.get('reqBirthLocation').value;
    req.birthdate = this.storeForm.get('reqBirthDate').value;
    req.cpf_cnpj = this.storeForm.get('reqCpfCnpj').value;
    req.gender = this.storeForm.get('reqGender').value;
    req.literacy = this.storeForm.get('reqLiteracy').value;
    req.marital_status = this.storeForm.get('reqMaritalStatus').value;
    req.nationality = this.storeForm.get('reqNationality').value;
    req.cep = this.storeForm.get('reqCep').value;
    req.city = this.storeForm.get('reqCity').value;
    req.adress = this.storeForm.get('reqAdress').value;
    req.adress_number = this.storeForm.get('reqAdressNumber').value;
    req.neighborhood = this.storeForm.get('reqNeighborhood').value;
    req.state = this.storeForm.get('reqState').value;

    sale.received = this.storeForm.get('saleReceived').value;
    sale.canceled = this.storeForm.get('saleCanceled').value;
    sale.complete = this.storeForm.get('saleCompleted').value;

    contract.content = this.storeForm.get('contract').value;
    contract.status = 1;

    user.name = this.storeForm.get('userName').value;
    user.email = this.storeForm.get('userEmail').value;
    user.password = this.storeForm.get('userPassword').value;
    user.type = 3;
    user.status = 1;

    let payload = {
      store: store,
      user_requirements: req,
      sales_status: sale,
      contract: contract,
      default_user: user
    }

    console.log(payload);
    return;
    this.ws.createStoreFull(payload)
    .then(
      response => {
        alert("Loja criada com sucesso")
        this.router.navigate(['dashboard', 'stores'])
      }
    )

  }
}
