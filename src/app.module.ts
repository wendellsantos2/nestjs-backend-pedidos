import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import config from 'ormconfig';
import { CategoriaModule } from './domain/categoria/categoria.module';
 
import { EstoqueModule } from './domain/estoque/estoque.module';
import { HistoricoPedidoModule } from './domain/historico_pedido/historico_pedido.module';
import { ItemProdutosPedidosModule } from './domain/item-produtos-pedidos/item-produtos-pedidos.module';
import { NotaFiscalModule } from './domain/nota-fiscal/nota-fiscal.module';
import { PagamentoModule } from './domain/pagamento/pagamento.module';
import { PedidoModule } from './domain/pedido/pedido.module';
import { ProdutoModule } from './domain/produto/produto.module';
import { RolesModule } from './domain/roles/roles.module';
import { AvaliacoesModule } from './domain/avaliacoes/avaliacoes.module';

@Module({
  imports: [UserModule,  CategoriaModule,AvaliacoesModule,
    ProdutoModule,
    RolesModule,
    PedidoModule,
    PagamentoModule,
    HistoricoPedidoModule,
    ItemProdutosPedidosModule,
    EstoqueModule,
    NotaFiscalModule,  TypeOrmModule.forRoot(config), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
