import { Injectable } from '@angular/core';
import { IProduto, produtos } from 'src/app/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  produtos: IProduto[] = produtos;

  constructor() { }

  getAll() {
    return this.produtos;
  }

  getOne(produtoId: number) {
    return this.produtos.filter(produto => produto.id == produtoId)[0];
  }
}
