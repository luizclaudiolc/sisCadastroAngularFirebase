import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductsService } from 'src/app/core/services/products.service';
import { Produto } from 'src/app/models/produto.models';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.scss']
})
export class AppModalDeleteProductComponent implements OnInit {
  @Output() formData: EventEmitter<Produto> = new EventEmitter();
  form!: FormGroup;

  title?: string;
  closeBtnName?: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef, public productsService: ProductsService) { }

  ngOnInit(): void {
  }

  deleteProduct(event: Produto) {
    this.productsService.delete(event);
  }

}
