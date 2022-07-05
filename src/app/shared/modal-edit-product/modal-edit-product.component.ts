import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductsService } from 'src/app/core/services/products.service';
import { Produto } from 'src/app/models/produto.models';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class AppModalEditProductComponent implements OnInit {
  // @Output() formData: EventEmitter<Produto> = new EventEmitter();
  form: FormGroup;

  title?: string;
  closeBtnName?: string;
  list: Produto[] = [];

  constructor(public bsModalRef: BsModalRef,
    public productsService: ProductsService,
    private formBuild: FormBuilder
    ) {
    this.form = this.formBuild.group({
      id: [''],
      nome: ['', Validators.required],
      preco: ['', Validators.compose([Validators.required])],
      qtd: ['', Validators.compose([Validators.required, this.onlyNumber])],
      // user_create: [''],
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.list[0]);
  }

  get nome() {
    return this.form.get('nome');
  }

  get preco() {
    return this.form.get('preco');
  }

  get qtd() {
    return this.form.get('qtd');
  }

  onSubmit() {
    this.productsService.salveOrEditProducts(this.form.value);
    this.bsModalRef.hide();
  }

  onlyNumber(control: AbstractControl) {
    const NUMBER_REGEXP = /^[0-9]+$/;
    if (control.value !== null && !NUMBER_REGEXP.test(control.value)) {
      return { invalidNumber: true };
    }
    return null;
  }
}
