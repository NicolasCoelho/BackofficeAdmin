import { Component, OnInit } from '@angular/core';

//Importando Router para Instanciamento no Constructor
import { ActivatedRoute, Router } from '@angular/router';

//Importando Ws para uso dos Metodos e acessar a API
import { Ws } from 'src/app/_services/ws';

//Importando o Formbuilder, FormGroup, Validators para tratamento do Formulário
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Importando o modelo Store para instanciamento;
import { Store } from '../../_models/stores';
import { Enviroment } from 'src/app/_models/enviroments';
import { UserRequirements } from 'src/app/_models/userRequirements';
import { SaleStatus } from 'src/app/_models/salesStatus';
import { Contract } from 'src/app/_models/contract';
import { User } from 'src/app/_models/user';
import { SystemStatusAndTypes } from 'src/app/_models/systemStatus';
import { promise } from 'protractor';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss'],
})
export class RegisterStoreComponent implements OnInit {
  public storeForm: FormGroup;

  public status: Array<SystemStatusAndTypes> = [];

  public enviroments: Array<Enviroment> = [];
  public store = new Store()
  public requirements = new UserRequirements()
  public sale = new SaleStatus()
  public contract = new Contract()
  public user = new User()

  public isEdit: boolean = false;
  public loading: boolean = false;
  public editController = {
    store: {touched: false, changed: false},
    salesStatus: {touched: false, changed: false},
    requirements: {touched: false, changed: false},
    contract: {touched: false, changed: false}
  }

  constructor(
    private ws: Ws,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getStatus()
    if (this.router.url.indexOf('edit') > -1) {
      this.isEdit = true;
      this.loading = true;
      this.currentRoute.params.subscribe( param => {
        const id = param.id
        let promises: Array<any> = [
          this.ws.getStore(id).then(response=> Object.assign(this.store, response)),
          this.ws.getContractByStore(id).then(response => Object.assign(this.contract, response)),
          this.ws.getUserRequirementsByStore(id).then(response => Object.assign(this.requirements, response)),
          this.ws.getSalesStatusByStore(id).then(response => Object.assign(this.sale, response))
        ]
        Promise.all(promises).catch(e => alert(e)).finally(()=>this.loading = false)
      })
    }
  }

  getStatus() {
    this.ws.getSystemStatusByType('STORE').then(
      response => {
        Object.assign(this.status, response)
      }
    )
  }

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
      storeAllowRegister: [''],
      storePaymentTime: ['', Validators.required],
      storeMinimumValue: ['', Validators.required],
      storeProtectedRegister: [''],
      storeComissionType: ['', Validators.required],
      storeComissionValue: ['', Validators.required],
      reqPhone1: ['', ],
      reqPhone2: ['', ],
      reqCpfCnpj: ['', ],
      reqPis: ['', ],
      reqRg: ['', ],
      reqBirthDate: ['', ],
      reqNationality: ['', ],
      reqBirthLocation: ['', ],
      reqMaritalStatus: ['', ],
      reqGender: ['', ],
      reqLiteracy: ['', ],
      reqCep: ['', ],
      reqAddress: ['', ],
      reqAddressNumber: ['', ],
      reqNeighborhood: ['', ],
      reqCity: ['', ],
      reqState: ['', ],
      reqBank: ['', ],
      reqAgency: ['', ],
      reqAccount: ['', ],
      reqAccountOwner: ['', ],
      reqAccountOwnerCpf: ['', ],
      saleReceived: ['', Validators.required],
      saleCompleted: ['', Validators.required],
      saleCanceled: ['', Validators.required],
      contract: ['', Validators.required],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userEmail: ['', Validators.required],
    });
    if (this.isEdit) {
      this.storeForm.get('userName').disable()
      this.storeForm.get('userPassword').disable()
      this.storeForm.get('userEmail').disable()
    }
  }

  register() {
    if (!this.storeForm.valid) {
      alert('Dados invalidos. Revise o formulário e tente novamente');
      return;
    }

    this.contract.status = 1;

    this.user.type = 3;
    this.user.status = 1;

    Object.keys(this.requirements).forEach(
      key => {
        if(this.requirements[key] === undefined) this.requirements[key] = false
      }
    )
    this.store.protectedRegister === undefined ? this.store.protectedRegister = false : null
    this.store.allowRegister === undefined ? this.store.allowRegister = false : true

    let payload = {
      store: this.store,
      userRequirements: this.requirements,
      salesStatus: this.sale,
      contract: this.contract,
      defaultUser: this.user
    }

    this.loading = true;
    if (this.isEdit) {
      let promises = [
        this.editController.store.changed ? this.ws.changeStore(this.store) : new Promise(r => r()),
        this.editController.salesStatus.changed ? this.ws.changeSalesStatus(this.sale) : new Promise(r => r()),
        this.editController.requirements.changed ? this.ws.changeUserRequirements(this.requirements): new Promise(r => r()),
        this.editController.contract.changed ? this.ws.changeContract(this.contract) : new Promise(r=>r())
      ]
      Promise.all(promises).then(
        () => {
          alert("Loja alterada com sucesso!")
          this.router.navigate(['dashboard', 'stores']);
        }
      ).catch(
        () => alert("Erro ao alterar loja")
      ).finally( () => this.loading = false )
    } else {
      this.ws.createStoreFull(payload)
      .then(
        response => {
          alert("Loja criada com sucesso")
          this.router.navigate(['dashboard', 'stores'])
        }
      ).catch(
        () => alert('Erro ao cadastras loja')
      ).finally()
    }
  }

  public setUnsave(target) {
    if (this.editController[target].touched) this.editController[target].changed = true
  }

  public setTouched(target) {
    this.editController[target].touched = true
  }
}
