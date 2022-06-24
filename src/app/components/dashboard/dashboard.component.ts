import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap, timer } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';


export interface IProduct {
  id: string;
  nome: string;
  preco: string;
  qtd: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    products: IProduct[] = [];
    displayedColumns = ['nome', 'preco', 'qtd', 'actions'];

    hasData?: boolean;
    textErr?: string;
  
  formProducts!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public productsService: ProductsService
  ) {
    this.formProducts = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      qtd: ['', Validators.compose([Validators.required, Validators.min(0)])],
      preco: ['', Validators.compose([Validators.required, Validators.min(0)])],
    });
  }

  ngOnInit(): void {
    this.productsService.productsList()
      .pipe(
        tap({
          next: products => {
            if (!products.length) {
              this.hasData = false;
              this.textErr = 'Nenhum produto encontrado';
              return;
            }
            this.hasData = true;
            this.textErr = '';
            
            products.forEach(({ id, nome, qtd, preco }: any) => 
              this.products.push({ id, nome, qtd, preco }));
            
          },
        }),
      ).subscribe();
  }

  ngAfterViewInit() {
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch(({ message }) => console.log(message));
  }

  onSubmit() {
    console.log(this.formProducts.value);
  }

  addProducts() {
    console.log('addProducts');
    
  }

  editProduct(product: IProduct) {
    console.log('editProduct', product.nome);
  }

  deleteProduct(product: IProduct) {
    console.log('deleteProduct', product.nome);
  }

}
