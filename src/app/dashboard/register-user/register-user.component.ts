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
  public formKeys: Array<any> = [];

  public loading: boolean = false;
  public isEdit: boolean = false;

  constructor(
    private ws: Ws,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    if (this.router.url.indexOf('edit') > -1) {
      this.isEdit = true;
      this.loading = true
      this.getUser()
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      pis: ['', Validators.required],
      rg: ['', Validators.required],
      birthdate: ['', Validators.required],
      nationality: ['', Validators.required],
      birthLocation: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      gender: ['', Validators.required],
      literacy: ['', Validators.required],
      cep: ['', Validators.required],
      address: ['', Validators.required],
      addressNumber: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      bank: ['', Validators.required],
      pix: ['', Validators.required],
      agency: ['', Validators.required],
      account: ['', Validators.required],
      accountOwner: ['', Validators.required],
      accountOwnerCpf: ['', Validators.required]
    });

    this.formKeys = Object.keys(this.userForm.controls)
    console.log(this.userForm.controls)
  }

  getUser() {
    this.currentRoute.params.subscribe(param => {
      this.ws.getUser(param.id).then(
        response => {
          Object.assign(this.user, response)
        }
      ).finally(() => this.loading = false)
    })
  }


  register() {
    if (this.isEdit) this.userForm.get('password').disable()

    if (!this.userForm.valid) {
      alert('Dados incorretos');
      return;
    }

    this.loading = true;
    if (this.isEdit) {
      // TODO: Implements ws edit function
      // this.ws.changeEnviroment(this.user)
      //   .catch((e)=> alert("Erro inesperado") )
      //   .finally(()=>{
      //     this.loading = false;
      //     alert("Ambiente editado com sucesso!");
      //   })
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
