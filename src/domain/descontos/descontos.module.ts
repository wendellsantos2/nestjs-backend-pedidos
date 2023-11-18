import { Module } from '@nestjs/common';
import { DescontosController } from './descontos.controller';
import { DescontosService } from './descontos.service';

@Module({
  controllers: [DescontosController],
  providers: [DescontosService]
})
export class DescontosModule {}
