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
import { Contract } from 'src/app/_models/contract';
import { User } from 'src/app/_models/user';
import { SystemStatusAndTypes } from 'src/app/_models/systemStatus';
import { Styles } from 'src/app/_models/styles';
import { SystemType } from 'src/app/_models/systemType';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss'],
})
export class RegisterStoreComponent implements OnInit {
  public storeForm: FormGroup;

  public status: Array<SystemStatusAndTypes> = [];

  public enviroments: Array<Enviroment> = [];
  public paymentTriggers: Array<SystemType> = [];

  public store = new Store()
  public requirements = new UserRequirements()
  public contract = new Contract()
  public styles = new Styles()
  public user = new User()

  public isEdit: boolean = false;
  public loading: boolean = false;
  public editController = {
    store: {touched: false, changed: false},
    requirements: {touched: false, changed: false},
    contract: {touched: false, changed: false},
    styles: {touched: false, changed: false}
  }

  constructor(
    private ws: Ws,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.getStatus()
    this.getTypes()
    if (this.router.url.indexOf('edit') > -1) {
      this.isEdit = true;
      this.loading = true;
      this.currentRoute.params.subscribe( param => {
        const id = param.id
        let promises: Array<any> = [
          this.ws.getStore(id).then(response=> Object.assign(this.store, response)),
          this.ws.getContractByStore(id).then(response => Object.assign(this.contract, response)),
          this.ws.getStylesByStore(id).then(response => Object.assign(this.styles, response)),
          this.ws.getUserRequirementsByStore(id).then(response => Object.assign(this.requirements, response)),
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

  getTypes() {
    this.ws.getSystemTypesByType('PAYMENT_TRIGGER').then(
      response => {
        Object.assign(this.paymentTriggers, response)
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
      storeEmail: ['', Validators.required],
      storeEnv: ['', Validators.required],
      storeStatus: ['', Validators.required],
      storeUrl: ['', Validators.required],
      storePainelUrl: ['', Validators.required],
      storeAppTitle: ['', Validators.required],
      storeFaviconLink: ['', Validators.required],
      storeHomeTemplate: ['', Validators.required],
      storeLogoSrc: ['', Validators.required],
      storeLogoWidth: ['', Validators.required],
      storeLogoHeight: ['', Validators.required],
      storeStylePath: ['', Validators.required],
      storeFontsLink: ['', Validators.required],
      storeStoreUrl: ['', Validators.required],
      storeWebsite: ['', Validators.required],
      storeAllowRegister: [''],
      storePaymentTrigger: ['', Validators.required],
      storePaymentTime: ['', Validators.required],
      storeMinimumValue: ['', Validators.required],
      storeProtectedRegister: [''],
      storeComissionType: ['', Validators.required],
      storeComissionValue: ['', Validators.required],
      reqPhone1: [''],
      reqPhone2: [''],
      reqCpfCnpj: ['',  Validators.required],
      reqPis: [''],
      reqRg: [''],
      reqBirthDate: [''],
      reqNationality: [''],
      reqBirthLocation: [''],
      reqMaritalStatus: [''],
      reqGender: [''],
      reqLiteracy: [''],
      reqCep: [''],
      reqAddress: [''],
      reqAddressNumber: [''],
      reqNeighborhood: [''],
      reqCity: [''],
      reqState: [''],
      reqBank: [''],
      reqPix: [''],
      reqAgency: [''],
      reqAccount: [''],
      reqAccountOwner: [''],
      reqAccountOwnerCpf: [''],
      contract: ['', Validators.required],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userEmail: ['', Validators.required],
      stylesCss: ['', Validators.required],
      stylesHomeTemplate: ['', Validators.required],
      stylesFontFamily: [''],
      stylesPrimary: [''],
      stylesSecondary: [''],
      stylesHeaderBg: [''],
      stylesContentBg: [''],
      stylesCardBg: [''],
      stylesLoginPageBg: [''],
      stylesLoginBoxBg: [''],
      stylesTextPrimary: [''],
      stylesLinksColor: [''],
      stylesLinksWeight: [''],
      stylesTextSecondary: [''],
      stylesBorderRadius: [''],
      stylesIconsColor: [''],
      stylesMenuBg: [''],
      stylesMenuButtonBgHover: [''],
      stylesMenuText: [''],
      stylesMenuTextHover: [''],
      stylesMenuBorderHover: [''],
      stylesTableHeaderBg: [''],
      stylesTableHeaderColor: [''],
      stylesTableVariation: [''],
      stylesTableFontSize: [''],
      stylesTablePadding: [''],
      stylesTableTextAlign: [''],
      stylesInputBg: [''],
      stylesInputBorder: [''],
      stylesInputPadding: [''],
      stylesInputFontSize: [''],
      stylesInputBorderRadius: [''],
      stylesInputColor: [''],
      stylesInputErrorColor: [''],
      stylesButtonColorPrimary: [''],
      stylesButtonBgPrimary: [''],
      stylesButtonBgDisabledPrimary: [''],
      stylesButtonColorSecondary: [''],
      stylesButtonBgSecondary: [''],
      stylesButtonBgDisabledSecondary: [''],
      stylesButtonFontWeight: [''],
      stylesButtonBorderRadius: [''],
      stylesButtonColorActivePrimary: [''],
      stylesButtonColorActiveSecondary: [''],
      stylesButtonPadding: [''],
      stylesButtonFontSize: [''],
      stylesLoadingIcon: [''],
      stylesLoadingSpinner: [''],
      stylesLoadingSpinnerBorder: [''],
      stylesModalBg: [''],
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
    this.contract.trainingPage = "";
    this.contract.helpPage = "";

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
      contract: this.contract,
      styles: this.styles,
      defaultUser: this.user
    }

    this.loading = true;
    if (this.isEdit) {
      let promises = [
        this.editController.store.changed ? this.ws.changeStore(this.store) : new Promise(r => r(null)),
        this.editController.requirements.changed ? this.ws.changeUserRequirements(this.requirements): new Promise(r => r(null)),
        this.editController.contract.changed ? this.ws.changeContract(this.contract) : new Promise(r => r(null)),
        this.editController.styles.changed ? this.ws.changeStyles(this.styles) : new Promise(r => r(null)),
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
