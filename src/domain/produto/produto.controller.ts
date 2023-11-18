import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from '../../entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Get()
    async findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Produto> {
        return this.produtoService.findOne(id);
    }

    @Post()
    async create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() produto: Produto): Promise<void> {
        await this.produtoService.update(id, produto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.produtoService.remove(id);
    }
}
