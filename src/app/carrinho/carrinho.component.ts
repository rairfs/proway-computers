import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../services/carrinho/carrinho.service';
import { IProdutoCarrinho } from '../produtos';
import { NotificacaoService } from '../services/notificacao/notificacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = []
  total = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calculaTotal();
  }

  removeProdutoCarrinho(produtoId: number) {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calculaTotal();
  }

  calculaTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  }

  comprar() {
    this.notificacaoService.notificar("Parabéns, você finalizou a sua compra!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"])
  }
}
