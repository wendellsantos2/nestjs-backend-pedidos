import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueService } from './estoque.service';
 
import { Estoque } from '../../entities/estoque.entity';
import { EstoqueController } from './estoque.controlle';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],
  providers: [EstoqueService],
  controllers: [EstoqueController],
})
export class EstoqueModule {}
