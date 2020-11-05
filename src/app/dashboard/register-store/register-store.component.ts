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
  public store = new Store()
  public requirements = new UserRequirements()
  public sale = new SaleStatus()
  public contract = new Contract()
  public user = new User()

  public isEdit: boolean = false;
  public loading: boolean = false;

  constructor(
    private ws: Ws,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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


    let payload = {
      store: this.store,
      user_requirements: this.requirements,
      sales_status: this.sale,
      contract: this.contract,
      default_user: this.user
    }

    if (this.isEdit) {

    } else {
      this.ws.createStoreFull(payload)
      .then(
        response => {
          alert("Loja criada com sucesso")
          this.router.navigate(['dashboard', 'stores'])
        }
      )
    }

  }
}
