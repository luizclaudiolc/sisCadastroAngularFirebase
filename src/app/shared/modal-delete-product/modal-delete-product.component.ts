import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductsService } from 'src/app/core/services/products.service';
import { Produto } from 'src/app/models/produto.models';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.scss'],
})
export class AppModalDeleteProductComponent implements OnInit {
  list: Produto[] = [];
  message?: string;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public productsService: ProductsService
  ) {}

  ngOnInit(): void {
    console.log(this.list);
  }

  // deleteProduct(event: Produto) {
  //   console.log(event.id);

  //   this.productsService.delete(event.id);
  // }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.bsModalRef?.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.bsModalRef?.hide();
  }
}
