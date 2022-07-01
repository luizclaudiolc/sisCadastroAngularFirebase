import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Produto } from 'src/app/models/produto.models';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss']
})
export class FormProdutoComponent implements OnInit {
  @Output('produto') formData: EventEmitter<Produto> = new EventEmitter();
  @Input('title') title?: string;
  @Input('data') data: any;
  form!: FormGroup;

  constructor(public bsModalRef: BsModalRef, private formBuild: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuild.group({
      id: [''],
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      qtd: ['', Validators.compose([Validators.required, this.onlyNumber])],
    });
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
    this.formData.emit(this.form.value);

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
