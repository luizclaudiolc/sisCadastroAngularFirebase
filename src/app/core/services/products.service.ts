import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { IProduct } from 'src/app/components/dashboard/dashboard.component';
import { Produto } from 'src/app/models/produto.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private af: AngularFirestore) { }

  productsList() {
    return this.af.collection('products').valueChanges();
  }

  create({ nome, preco, qtd }: Produto) {
    const id = this.af.createId();
    return this.af.doc(`products/${id}`).set({
      id,
      nome,
      preco,
      qtd,
    });
  }

  update(product: Produto) {
    return this.af.doc(`products/${product.id}`).update(product);
  }

  async delete(product: Produto) {
    try {
      await this.af.collection('products').doc(product.id).delete();
      console.log('Produto deletado com sucesso');
    } catch (err) {
      console.log(err);
    }
  }
}
