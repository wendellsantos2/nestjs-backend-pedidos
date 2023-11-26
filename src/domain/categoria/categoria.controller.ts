import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { CategoriaService } from 'src/domain/categoria/categoria.service';
import { CreateCategoriaDto } from './dto/createCategoriaDto';
import { UpdateCategoriaDto } from './dto/UpdateCategoriaDto';

@ApiTags('categoria')
@Controller('categoria')
export class CategoriaController {
  constructor(
    private categoriaService: CategoriaService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova categoria' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  async createCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias' })
  async getCategorias() {
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
