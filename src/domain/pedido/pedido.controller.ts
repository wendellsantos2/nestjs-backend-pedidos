// src/pedido/pedido.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/CreatePedidoDto';
import { Pedido } from 'src/entities/pedido.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
 
@ApiTags('Pedido') // Swagger tag
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @ApiOperation({
    summary: 'Criar um novo pedido',
    description: 'Cria um novo pedido no sistema. É necessário fornecer detalhes do pedido como total, metodo_pagamento,status_pedido,usuario_id'
  })
  @ApiBody({
    description: 'Dados para a criação de um novo pedido',
    type: CreatePedidoDto,
    examples: {
      normalUser: {
        summary: 'Nome do pedido ',
        value: {
          "total": 100.50,
          "metodo_pagamento": "cartao_credito",
          "status_pedido": "em_processamento",
          "usuario_id": 1
        }
      },
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
   @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }
  @ApiOperation({
    summary: 'Listar todos ',
    description: 'Listar todos'
  })
  @Get()
  async findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @ApiOperation({
    summary: 'Buscar pedido por ID',
    description: 'Retorna os detalhes de um pedido específico pelo seu ID.'
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar um pedido',
    description: 'Atualiza os detalhes de um pedido existente. É necessário fornecer o ID do pedido e os novos detalhes para atualização.'
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.update(id, updatePedidoDto);
  }

  @ApiOperation({
    summary: 'Excluir um pedido',
    description: 'Remove um pedido do sistema com base no ID fornecido.'
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.pedidoService.remove(id);
  }
}
