import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../../entities/categoria.entity';  // Importando a entidade Categoria
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';  // Assumindo que você tem um controller para Categoria
 

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria]), // Adicionando a entidade Categoria ao módulo do TypeORM
  ],
  providers: [CategoriaService],
  controllers: [CategoriaController], // Adicionando o controller de Categoria
  exports: [CategoriaService], // (Opcional) Exportando o serviço caso outros módulos necessitem dele
})
export class CategoriaModule {}
