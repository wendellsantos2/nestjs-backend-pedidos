import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../../entities/produto.entity';

@Injectable()
export class ProdutoService {
  findOne(id: string): Produto | PromiseLike<Produto> {
      throw new Error('Method not implemented.');
  }
  create(produto: Produto): Produto | PromiseLike<Produto> {
      throw new Error('Method not implemented.');
  }
  update(id: string, produto: Produto) {
      throw new Error('Method not implemented.');
  }
  remove(id: string) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  // Add more methods as needed
}
