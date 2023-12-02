import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from '../../entities/produto.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProdutoDTO } from './dto/produto.dto';
@ApiTags('Produto') // Adicione a tag para a controladora AuthController
@Controller('produto')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @ApiOperation({
        summary: 'Listar todos os produtos',
        description: 'Retorna uma lista de todos os produtos cadastrados no sistema.'
    })
    @Get()
    async findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @ApiOperation({
        summary: 'Buscar produto por ID',
        description: 'Retorna os detalhes de um produto específico pelo seu ID.'
    })
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Produto> {
        return this.produtoService.findOne(id);
    }

    @ApiOperation({
        summary: 'Criar um novo Produto',
        description: 'Criar um novo Produto'
    })
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
    @ApiOperation({
        summary: 'Atualizar um produto',
        description: 'Atualiza os detalhes de um produto existente. É necessário fornecer o ID do produto e os novos detalhes para atualização.'
    })
    @Put(':id')
    async update(@Param('id') id: number, @Body() produto: Produto): Promise<void> {
        await this.produtoService.update(id, produto);
    }

    @ApiOperation({
        summary: 'Excluir um produto',
        description: 'Remove um produto do sistema com base no ID fornecido.'
    })
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        await this.produtoService.remove(id);
    }
}
