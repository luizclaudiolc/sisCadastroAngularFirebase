import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Login } from 'src/app/models/Login.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /* formLogin: FormGroup;
  formCreate: FormGroup; */

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    /* this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });

    this.formCreate = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    }); */
  }

  ngOnInit(): void {
  }

  /* login() {
    if (this.formLogin.valid) {
      this.auth
        .login(this.formLogin.value)
        .then((user) => {
          console.log(user);
          this.router.navigate(['/cadastro']);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  createUser() {
    if (this.formCreate.valid) {
      this.auth
        .createUser(this.formCreate.value)
        .then((user) => {
          console.log(user);
          this.router.navigate(['/cadastro']);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  loginWithGoogle() {
    this.auth
      .loginWithGoogle()
      .then((user) => {
        console.log(user);
        this.router.navigate(['/cadastro']);
      })
      .catch((error) => {
        console.log(error.message);
      });
  } */

  login(loginData: Login) {
    this.auth
      .login(loginData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }

  loginWithGoogle() {
    this.auth
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }
}
