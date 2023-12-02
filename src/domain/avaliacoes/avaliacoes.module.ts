import { Module } from '@nestjs/common';
import { AvaliacoesController } from './avaliacoes.controller';
import { AvaliacoesService } from './avaliacoes.service';
import { Avaliacao } from 'src/entities/avaliacoes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao])],
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService]
})
export class AvaliacoesModule {}
