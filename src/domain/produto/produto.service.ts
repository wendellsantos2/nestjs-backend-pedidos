import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }
  
  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({ 
      where: { id_produto: id }
    });

    if (!produto) {
      throw new NotFoundException(`Produto with ID "${id}" not found`);
    }
    return produto;
  }
  async remove(id: number): Promise<void> {
    const existingProduto = await this.produtoRepository.findOne({
      where: { id_produto: id }
    });

    if (!existingProduto) {
      throw new NotFoundException(`Produto with ID "${id}" not found`);
    }

    await this.produtoRepository.delete({ id_produto: id });
  }
  async create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async update(id: number, produtoData: Partial<Produto>): Promise<Produto> {
    const existingProduto = await this.produtoRepository.findOne({
      where: { id_produto: id }
    });

    if (!existingProduto) {
      throw new NotFoundException(`Produto with ID "${id}" not found`);
    }

    await this.produtoRepository.update({ id_produto: id }, produtoData);

    // Retrieve the updated Produto
    return this.produtoRepository.findOne({
      where: { id_produto: id }
    });
  }



  // Add more methods as needed
}
