import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, take, tap } from 'rxjs';
import { Produto } from 'src/app/models/produto.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  user_id?: string | null;

  constructor(private af: AngularFirestore, private authService: AngularFireAuth) {
    this.authService.authState.subscribe((user) => {
      this.user_id = user?.uid;
      this.productsList(this.user_id);
    })
  }

  productsList(uid?: string): Observable<any> {
    console.log(uid);
    
    return this.af.collection('products').valueChanges();
    /* return !uid ? this.af.collection('products').valueChanges() :
      this.af.collection('products', ref => uid ? ref.where('user_create', '==', uid): ref).valueChanges() */
  }

  salveOrEditProducts(produto: any) {
    /* produto.user_create == '' ? produto.user_create = this.user_id : '';
    produto.id == '' ? produto.id = this.af.createId() : produto.id;

    return this.af.collection('products').doc(produto.id).set(produto, { merge: true }); */

    let { id, nome, preco, qtd } = produto;
    if (id) return this.af.collection('products').doc(id).set({ nome, preco, qtd },
      { merge: true });

    id = this.af.createId();
    return this.af.doc(`products/${id}`).set({
      id,
      nome,
      preco,
      qtd,
    }, { merge: true });
  }

  delete(id: string) {
    return this.af.collection('products').doc(id).delete();
  }

  editProductPrice(id: string, plusOrMinus: string) {
    const produto = this.af.doc(`products/${id}`).valueChanges();
    return produto.pipe(
      take(1),
      tap((data: any) => {
        const { preco } = data;
        const newPrice = plusOrMinus === 'plus' ? Number(preco) + 1 : Number(preco) - 1;
        this.af.doc(`products/${id}`).set({
          preco: `${ newPrice }`,
        }, { merge: true });
      }),
    ).subscribe();
  }
}
