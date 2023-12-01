import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from '../../entities/produto.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProdutoDTO } from './dto/produto.dto';
@ApiTags('Produtos') // Adicione a tag para a controladora AuthController
@Controller('produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Get()
    async findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Produto> {
        return this.produtoService.findOne(id);
    }
    @ApiBody({
        description: 'Dados para a criação de uma novo Produto',
        type: CreateProdutoDTO,
        examples: {
          normalUser: {
            summary: 'Nome do Produto ',
            value: {
                "descricao": "Example Product",
                "preco": 100.00,
                "estoque": 50,
                "imagem_url": "http://example.com/product-image.jpg",
                "categoria_id": 1 
              }
              
          },
        }
      })
      @ApiResponse({ status: 400, description: 'Dados inválidos. Por favor, verifique os dados fornecidos.' })
       @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
    @Post()
    async create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() produto: Produto): Promise<void> {
        await this.produtoService.update(id, produto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        await this.produtoService.remove(id);
    }
}
