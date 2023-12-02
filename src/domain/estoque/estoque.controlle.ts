import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { Estoque } from '../../entities/estoque.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
 
import { CreateEstoqueDTO } from './dto/CreateEstoqueDto';
@ApiTags('Estoque') // Tag Swagger para UserController
@Controller('estoque')
export class EstoqueController {
  constructor(private estoqueService: EstoqueService) {}
  @ApiOperation({
    summary: 'Listar todo o estoque',
    description: 'Retorna uma lista de todos os itens em estoque.'
  })
  @Get()
  findAll(): Promise<Estoque[]> {
    return this.estoqueService.findAll();
  }
  @ApiOperation({
    summary: 'Buscar item de estoque por ID',
    description: 'Retorna os detalhes de um item específico do estoque pelo seu ID.'
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Estoque> {
    return this.estoqueService.findOne(id);
  }

  @ApiOperation({
    summary: 'Adicionar novo item ao estoque',
    description: 'Cria um novo item de estoque. É necessário fornecer o ID do produto e a quantidade.'
  })
  @ApiBody({
    description: 'Dados para a criação de uma novo Produto',
    type: CreateEstoqueDTO,
    examples: {
      normalUser: {
        summary: 'Nome do Produto ',
        value: {
            "id_produto": 1,
            "quantidade": 100
        } 
      },
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
   @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @Post()
  create(@Body() estoqueData: Estoque): Promise<Estoque> {
    return this.estoqueService.create(estoqueData);
  }
  
  @ApiOperation({
    summary: 'Atualizar item de estoque',
    description: 'Atualiza um item de estoque existente. É necessário fornecer o ID do item de estoque e os novos detalhes.'
  })
  @ApiBody({
    description: 'Dados para a atualizar o estoque',
    type: CreateEstoqueDTO,
    examples: {
      normalUser: {
        summary: 'atualizacao do estoque ',
        value: {
         
            "quantidade": 100
        } 
      },
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
   @ApiResponse({ status: 201, description: 'Estoque atualizado com sucesso' })
  @Put(':id')
  update(@Param('id') id: number, @Body() estoqueData: CreateEstoqueDTO): Promise<Estoque> {
    return this.estoqueService.update(id, estoqueData);
  }

  @ApiOperation({
    summary: 'Remover item de estoque',
    description: 'Remove um item do estoque com base no ID fornecido.'
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.estoqueService.remove(id);
  }
}
