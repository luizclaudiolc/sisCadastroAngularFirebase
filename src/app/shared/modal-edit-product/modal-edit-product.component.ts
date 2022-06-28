import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductsService } from 'src/app/core/services/products.service';
import { Produto } from 'src/app/models/produto.models';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class AppModalEditProductComponent implements OnInit {
  @Output() formData: EventEmitter<Produto> = new EventEmitter();
  form!: FormGroup;

  title?: string;
  closeBtnName?: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef, public productsService: ProductsService) { }

  ngOnInit(): void {
  }

  editProduct(event: Produto) {
    this.productsService.update(event)
  }

}
