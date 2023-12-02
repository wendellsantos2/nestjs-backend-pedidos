import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PagamentoService } from 'src/domain/pagamento/pagamento.service';
 
import { Pagamento } from 'src/entities/pagamento.entity';
import { PagamentoController } from './pagamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento])],
  providers: [PagamentoService],
  controllers: [PagamentoController],
})
export class PagamentoModule {}
