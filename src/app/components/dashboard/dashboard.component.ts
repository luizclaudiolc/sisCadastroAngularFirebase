import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { map, tap, timer } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { AppModalEditProductComponent } from 'src/app/shared/modal-edit-product/modal-edit-product.component';
import { AppModalAddProductComponent } from 'src/app/shared/modal/modal.component';


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

    bsModalRef?: BsModalRef;
  
  formProducts!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public productsService: ProductsService,
    private modalService: BsModalService,
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
    const data: ModalOptions = {
      initialState: {
        title: 'Adicionar produto',
        list: [],
      }
    }

    this.bsModalRef = this.modalService.show(AppModalAddProductComponent, data);
  }

  editProduct(product: IProduct) {
    const data: ModalOptions = {
      initialState: {
        title: 'Editar Produto',
        list: [product],
      }
    }
    

    this.bsModalRef = this.modalService.show(AppModalEditProductComponent, data);
  }

  deleteProduct(product: IProduct): void {
    const data: ModalOptions = {
      initialState: {
        title: 'Excluir Produto',
        list: [product],
      }
    }

    this.bsModalRef = this.modalService.show(AppModalEditProductComponent, data);
  }
}
