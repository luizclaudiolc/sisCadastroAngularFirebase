import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Produto } from '../models/produto.models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  lista: any;

  constructor(private db: AngularFirestore) {
    this.list();
  }

  save(produto: Produto) {
    produto.id === '' ? produto.id = this.db.createId() : produto.id = produto.id;
    return this.db.collection('products').doc(produto.id).set(produto, { merge: true });
  }

  list() {
    this.lista = this.db.collection('products').valueChanges();
  }

  delete(id: string) {
    return this.db.collection('products').doc(id).delete();
  }
}
