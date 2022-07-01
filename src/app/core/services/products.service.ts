import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { Produto } from 'src/app/models/produto.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // list?: Observable<any>;

  constructor(private af: AngularFirestore) { }

  productsList(): Observable<any> {
    return this.af.collection('products').valueChanges();
  }

  salveOrEditProducts(produto: Produto) {
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
}
