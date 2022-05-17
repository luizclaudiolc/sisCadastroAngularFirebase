import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from '@angular/fire/auth';

import { Login } from 'src/app/models/Login.models';

const provaider = new GoogleAuthProvider();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login({ email, password }: Login) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: Login) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, provaider);
  }

  logout() {
    return signOut(this.auth);
  }
}
