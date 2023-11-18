import { Module } from '@nestjs/common';
import { ItemProdutosPedidosService } from './item-produtos-pedidos.service';
import { ItemProdutosPedidosController } from './item-produtos-pedidos.controller';

@Module({
  providers: [ItemProdutosPedidosService],
  controllers: [ItemProdutosPedidosController]
})
export class ItemProdutosPedidosModule {}
