import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { PagamentoService } from 'src/domain/pagamento/pagamento.service';
 
import { Pagamento } from 'src/entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/pagamento.dto';
 

@ApiTags('pagamento')
@Controller('pagamento')
export class PagamentoController {
  constructor(
    private pagamentoService: PagamentoService,
  ) {}
  
  @ApiOperation({
    summary: 'Criar um novo pagamento',
    description: 'Cria um novo pedido no sistema. É necessário fornecer detalhes do pagamento como valor, data_pagamento,numero_parcelas,id_pedido'
  })
  @ApiBody({
    description: 'Dados para a criação de um novo pagamento',
    type: CreatePagamentoDto,
    examples: {
      normalUser: {
        summary: 'Nome do pagamento ',
        value: {
          "valor": 150.00,
          "data_pagamento": "2023-12-02T12:00:00Z",
          "tipo": "cartao_credito",
          "status": "confirmado",
          "numero_parcelas": 1,
          "id_pedido": 1
        }
      },
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
   @ApiResponse({ status: 201, description: 'Pagamento criada com sucesso' })
  @Post()
  @ApiOperation({
    summary: 'Criar um novo pagamento',
    description: 'Cria um novo pagamento no sistema. É necessário fornecer os detalhes do pagamento'
  })
  @ApiBody({
    description: 'Dados para a criação de um novo pagamento',
    type: CreatePagamentoDto
    // Exemplos e demais anotações aqui
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 201, description: 'Pagamento criado com sucesso.' })
  async createPagamento(@Body() createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    return await this.pagamentoService.create(createPagamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pagamentos' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de pagamentos', type: Pagamento, isArray: true })
  async getPagamentos(): Promise<Pagamento[]> {
    return await this.pagamentoService.findAll();
  }

  @Get(':id_pagamento/:id_pedido')
  @ApiOperation({ summary: 'Obter detalhes de um pagamento' })
  @ApiResponse({ status: 200, description: 'Detalhes do pagamento' })
  async getPagamentoById(@Param('id_pagamento') id_pagamento: number, @Param('id_pedido') id_pedido: number): Promise<Pagamento> {
    return await this.pagamentoService.findOne(id_pagamento, id_pedido);
  }

  @Put(':id_pagamento/:id_pedido')
  @ApiOperation({ summary: 'Atualizar um pagamento' })
  @ApiBody({ type: CreatePagamentoDto })
  @ApiResponse({ status: 200, description: 'Pagamento atualizado com sucesso' })
  async updatePagamento(@Param('id_pagamento') id_pagamento: number, @Param('id_pedido') id_pedido: number, @Body() updatePagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    return await this.pagamentoService.update(id_pagamento, id_pedido, updatePagamentoDto);
  }

  @Delete(':id_pagamento/:id_pedido')
  @ApiOperation({ summary: 'Excluir um pagamento' })
  @ApiResponse({ status: 200, description: 'Pagamento excluído com sucesso' })
  async deletePagamento(@Param('id_pagamento') id_pagamento: number, @Param('id_pedido') id_pedido: number): Promise<void> {
    return await this.pagamentoService.remove(id_pagamento, id_pedido);
  }

}
