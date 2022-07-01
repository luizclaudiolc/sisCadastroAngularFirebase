import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { map, Observable, tap, timer } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Produto } from 'src/app/models/produto.models';
import { AppModalDeleteProductComponent } from 'src/app/shared/modal-delete-product/modal-delete-product.component';
import { AppModalEditProductComponent } from 'src/app/shared/modal-edit-product/modal-edit-product.component';
import { AppModalAddProductComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource: Observable<Produto[]> = new Observable<Produto[]>();

  products: Produto[] = [];

  // displayedColumns = ['nome', 'preco', 'qtd', 'actions'];

  hasData?: boolean;
  textErr?: string;

  loggedEmail?: string | null;

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
    this.dataSource = this.productsService.productsList();
  }

  ngOnInit(): void {
    this.dataSource.pipe(
      tap((data) => {
        if (!data.length) {
          this.hasData = false;
          this.textErr = 'Nenhum produto encontrado';
          return;
        }

        this.hasData = true;
        this.textErr = '';

        this.products = this.parseData(data);
      }),
    ).subscribe();

    this.loggedEmail = this.authService.getUser();
  }

  parseData(data: Produto[]): Produto[] {
    return data.map(({ id, nome, preco, qtd }: Produto) => ({
      id,
      nome,
      preco,
      qtd,
    }));
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

  editProduct({ id, nome, preco, qtd }: Produto) {
    const data: ModalOptions = {
      initialState: {
        title: 'Editar Produto',
        list: [{
          id,
          nome,
          preco: /\D/g.test(preco) ? preco.replace(/\D/g, '') : preco,
          qtd,
        }],
      }
    }
    
    this.bsModalRef = this.modalService.show(AppModalEditProductComponent, data);
  }

  deleteProduct(product: Produto): void {
    const data: ModalOptions = {
      initialState: {
        title: 'Excluir Produto',
        list: [product],
      }
    }

    this.bsModalRef = this.modalService.show(AppModalDeleteProductComponent, data);
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: string): void {
    this.productsService.delete(id);
    
    this.bsModalRef?.hide();
  }

  decline(): void {
    this.bsModalRef?.hide();
  }
}
