import { Module } from '@nestjs/common';
import { PontuacaoService } from './pontuacao.service';
import { PontuacaoController } from './pontuacao.controller';

@Module({
  providers: [PontuacaoService],
  controllers: [PontuacaoController]
})
export class PontuacaoModule {}
