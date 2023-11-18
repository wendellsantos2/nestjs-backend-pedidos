import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../../entities/produto.entity';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
 

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  providers: [ProdutoService],
  controllers: [ProdutoController],  // Adicionando o ProdutoController
  exports: [ProdutoService], // (Opcional) Exportando o serviço caso outros módulos necessitem dele
})
export class ProdutoModule {}
