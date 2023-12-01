import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { Estoque } from '../../entities/estoque.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
 
import { CreateEstoqueDTO } from './dto/CreateEstoqueDto';
@ApiTags('Estoque') // Tag Swagger para UserController
@Controller('estoque')
export class EstoqueController {
  constructor(private estoqueService: EstoqueService) {}

  @Get()
  findAll(): Promise<Estoque[]> {
    return this.estoqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Estoque> {
    return this.estoqueService.findOne(id);
  }
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

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.estoqueService.remove(id);
  }
}
