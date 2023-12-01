import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { CategoriaService } from 'src/domain/categoria/categoria.service';
import { CreateCategoriaDto } from './dto/createCategoriaDto';
import { UpdateCategoriaDto } from './dto/UpdateCategoriaDto';
import { Categoria } from 'src/entities/categoria.entity';

@ApiTags('categoria')
@Controller('categoria')
export class CategoriaController {
  constructor(
    private categoriaService: CategoriaService,
  ) {}

  @Post()
 
  @ApiOperation({
    summary: 'Criar uma nova categoria',
    description: 'Cria uma nova categoria no sistema. É necessário fornecer detalhes da categoria como nome, descricao'
  })
  @ApiBody({
    description: 'Dados para a criação de uma nova categoria',
    type: CreateCategoriaDto,
    examples: {
      normalUser: {
        summary: 'Nome da Categoria ',
        value: {
          nome_categoria: 'Arroz',
          descricao: '20 kg',
        }
      },
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
   @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
   async createCategoria(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const createdCategoria = await this.categoriaService.create(createCategoriaDto);
    return createdCategoria;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de categorias', type: Categoria, isArray: true })
  async getCategorias(): Promise<Categoria[]> {
    return await this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma categoria' })
  @ApiResponse({ status: 200, description: 'Detalhes da categoria' })
  async getCategoriaById(@Param('id') id: string) {
    return await this.categoriaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma categoria' })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso' })
  async updateCategoria(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return await this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma categoria' })
  @ApiResponse({ status: 200, description: 'Categoria excluída com sucesso' })
  async deleteCategoria(@Param('id') id: string) {
    return await this.categoriaService.remove(id);
  }
}
