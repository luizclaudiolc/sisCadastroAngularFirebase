import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormProdutoModule } from '../form-produto/form-produto.module';
import { AppModalDeleteProductComponent } from './modal-delete-product.component';




@NgModule({
  declarations: [
    AppModalDeleteProductComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormProdutoModule
  ],
  exports: [
    AppModalDeleteProductComponent
  ]
})
export class AppModalDeleteProductModule { }
