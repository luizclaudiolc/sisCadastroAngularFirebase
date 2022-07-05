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
  }

  ngOnInit(): void {
  }

  login(loginData: Login) {
    this.auth
      .login(loginData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => {
        console.log(e.message);
      });
  }

  loginWithGoogle() {
    this.auth
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }
}
