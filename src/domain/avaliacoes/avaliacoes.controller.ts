import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
 
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateAvaliacaoDTO } from './dto/CreateAvaliacaoDto';
import { Avaliacao } from 'src/entities/avaliacoes.entity';
import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';
 

@ApiTags('Avaliacoes') // Swagger tag
@Controller('avaliacoes')
export class AvaliacoesController {
  constructor(private avaliacoesService: AvaliacoesService) {}

  @ApiOperation({
    summary: 'Listar todas as avaliações',
    description: 'Retorna uma lista de todas as avaliações cadastradas no sistema.'
  })
  @Get()
  findAll(): Promise<Avaliacao[]> {
    return this.avaliacoesService.findAll();
  }
 @ApiOperation({
    summary: 'Buscar avaliação por ID',
    description: 'Retorna os detalhes de uma avaliação específica pelo seu ID.'
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Avaliacao> {
    return this.avaliacoesService.findOne(id);
  }
  
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @ApiOperation({
    summary: 'Criar uma nova avaliação',
    description: 'Cria uma nova avaliação no sistema. É necessário fornecer detalhes como usuário, produto, avaliação e comentário.'
  })
  @ApiBody({
    description: 'Dados para a criação de uma nova avaliação',
    type: CreateAvaliacaoDTO,
    examples: {
      example1: {
        summary: 'Avaliação de Produto',
        value: {
          "usuario_id": 1,
          "produto_id": 1,
          "avaliacao": 4,
          "comentario": "Ótimo produto"
        } 
      },
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
  @ApiResponse({ status: 201, description: 'Avaliação criada com sucesso' })
  @Post()
  create(@Body() avaliacaoData: CreateAvaliacaoDTO): Promise<Avaliacao> {
    return this.avaliacoesService.create(avaliacaoData);
  }
  @ApiOperation({
    summary: 'Atualizar uma avaliação',
    description: 'Atualiza uma avaliação existente. É necessário fornecer o ID da avaliação e os novos detalhes.'
  })
  @ApiBody({
    description: 'Dados para atualizar uma avaliação',
    type: CreateAvaliacaoDTO,
    examples: {
      example1: {
        summary: 'Atualização de Avaliação',
        value: {
          "avaliacao": 5,
          "comentario": "Excelente! Recomendo."
        } 
      },
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
  @ApiResponse({ status: 200, description: 'Avaliação atualizada com sucesso' })
  @Put(':id')
  update(@Param('id') id: number, @Body() avaliacaoData: CreateAvaliacaoDTO): Promise<Avaliacao> {
    return this.avaliacoesService.update(id, avaliacaoData);
  }
 @ApiOperation({
    summary: 'Remover uma avaliação',
    description: 'Remove uma avaliação do sistema com base no ID fornecido.'
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.avaliacoesService.remove(id);
  }
}
