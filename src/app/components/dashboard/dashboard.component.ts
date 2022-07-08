import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { map, Observable, Subject, takeUntil, tap, timer } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Produto } from 'src/app/models/produto.models';
import { AppModalEditProductComponent } from 'src/app/shared/modal-edit-product/modal-edit-product.component';
import { AppModalAddProductComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource: Observable<Produto[]> = new Observable<Produto[]>();

  products: Produto[] = [];

  // displayedColumns = ['nome', 'preco', 'qtd', 'actions'];

  hasData?: boolean;
  textErr?: string;

  loggedEmail?: string | null;

  bsModalRef?: BsModalRef;

  private destroySubsjec$ = new Subject<boolean>();
  
  formProducts!: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public productsService: ProductsService,
    private modalService: BsModalService,
  ) {
    this.dataSource = this.productsService.productsList();
  }

  ngOnInit(): void {
    this.dataSource.pipe(
      takeUntil(this.destroySubsjec$),
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

  ngOnDestroy(): void {
    this.destroySubsjec$.next(true);
    // this.destroySubsjec$.unsubscribe();

    this.destroySubsjec$.complete();
  }

  parseData(data: Produto[]): Produto[] {
    return data.map(({ id, nome, preco, qtd }: Produto) => ({
      id,
      nome: nome.toUpperCase(),
      preco,
      qtd,
    }));
  }

  ngAfterViewInit() {
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

  editProduct(produto: Produto) {
    const data: ModalOptions = {
      initialState: {
        title: 'Editar Produto',
        list: [produto],
      }
    }
    
    this.bsModalRef = this.modalService.show(AppModalEditProductComponent, data);
  }

  openModal(template: TemplateRef<HTMLElement>) {
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(id: string): void {
    this.productsService.delete(id);

    this.bsModalRef?.hide();
  }

  editProductPrice(id: string, plusOrMinus: string): void {
    this.productsService.editProductPrice(id, plusOrMinus);
  }

  editProductMinusQtd(id: string, plusOrMinus: string): void {
    this.productsService.editProductPrice(id, plusOrMinus);
  }
}
