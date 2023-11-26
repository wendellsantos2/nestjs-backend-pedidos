import { Injectable } from '@nestjs/common';
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

  async findOne(id: string): Promise<Produto> {
    return this.produtoRepository.findOne(id as any);
  }

  async create(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  async update(id: string, produtoData: Partial<Produto>): Promise<Produto> {
    await this.produtoRepository.update(id, produtoData);
    return this.produtoRepository.findOne(id as any);
  }

  async remove(id: string): Promise<void> {
    await this.produtoRepository.delete(id);
  }

  // Add more methods as needed
}
