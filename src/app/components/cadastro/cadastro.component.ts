import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/models/produto.models';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formProducts: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public productService: CrudService
  ) {
    this.formProducts = this.formBuilder.group({
      id: [''],
      nome: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      preco: ['', Validators.compose([Validators.required])],
      qtd: [Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {}

  saveProduct() {
    this.formProducts.valid
      ? this.productService
          .save(this.formProducts.value)
          .then((res) => {
            this.formProducts = this.formBuilder.group({
              id: [''],
              nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
              preco: ['', Validators.compose([Validators.required])],
              qtd: ['', Validators.compose([Validators.required])],
            });
          })
          .catch((err) => {
            console.log('Erro ao criar produto', err);
          })
      : console.log('preencha todos os campos');
  }

  editProduct({ id, nome, preco, qtd }: Produto) {
    this.formProducts.patchValue({
      id,
      nome,
      preco,
      qtd
    })
  }

  deleteProduct(id: string) {
    this.productService.delete(id);
  }
}
