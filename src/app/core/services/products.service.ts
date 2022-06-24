import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { IProduct } from 'src/app/components/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private af: AngularFirestore) { }

  create() {
    return this.af.collection('products').valueChanges();
  }

  productsList() {
    /* console.log('productsList', this.af.collection('products').valueChanges()
    .subscribe(products => products
      .forEach(({ id, nome, qtd, preco }: any) => console.log(id, nome, qtd, preco)))); */
    
    return this.af.collection('products').valueChanges()
    /*   .subscribe(products => products
        .map(({ id, nome, qtd, preco }: any) => ({ id, nome, qtd, preco }))
      ) */
    
      
  }
}
