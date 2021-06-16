import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Ws } from 'src/app/_services/ws';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public user: User = new User();
  public userForm: FormGroup;

  public status: Array<any> = [];
  public types: Array<any> = [];
  public userType:string = "";

  public loading: boolean = false;
  public isEdit: boolean = false;

  constructor(
    private ws: Ws,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.getStatus();
    if (this.router.url.indexOf('edit') > -1) {
      this.isEdit = true;
      this.loading = true;
      this.getUser();
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      status: ['', Validators.required],
      phone1: [''],
      phone2: [''],
      cpfCnpj: ['', Validators.required],
      pis: [''],
      rg: [''],
      birthdate: [''],
      nationality: [''],
      birthLocation: [''],
      maritalStatus: [''],
      gender: [''],
      literacy: [''],
      cep: [''],
      address: [''],
      addressNumber: [''],
      neighborhood: [''],
      city: [''],
      state: [''],
      bank: [''],
      pix: [''],
      agency: [''],
      account: [''],
      accountOwner: [''],
      accountOwnerCpf: ['']
    });
  }

  getUser() {
    this.currentRoute.params.subscribe(param => {
      this.ws.getUser(param.id).then(
        response => {
          Object.assign(this.user, response)
          this.getTypes();
        }
      ).finally(() => this.loading = false)
    })
  }

  getStatus() {
    this.ws.getSystemStatusByType('USER').then(
      response => {
        Object.assign(this.status, response)
      }
    )
  }

  getTypes() {
    this.ws.getSystemTypesByType('USER').then(
      response => {
        Object.assign(this.types, response)
        this.types.forEach((type)=>{
          if(type.value === this.user.type) {
            this.userType = type.viewValue;
          }
        });
      }
    )
  }

  register() {
    Object.keys(this.userForm.controls).forEach((control) => {
      console.log(control)
      console.log(this.userForm.get(control).errors)
      console.log('-----------')
    })
    if (!this.userForm.valid) {
      alert('Dados incorretos');
      return;
    }

    this.loading = true;
    if (this.isEdit) {
      this.ws.changeUser(this.user.id, this.user)
        .catch((e)=> alert("Erro inesperado") )
        .finally(()=>{
          this.loading = false;
          alert("Usuário editado com sucesso!");
          this.router.navigate(['dashboard', 'users']);
        })
    } else {
      // TODO: Implements ws create function
      // this.ws
      // .createEnviroment(this.enviroment)
      // .then((response) => {
      //   alert('Cadastro realizado com sucesso');
      //   this.router.navigate(['dashboard', 'enviroments']);
      // })
      // .catch((e) => console.log(e));
    }
  }

}
