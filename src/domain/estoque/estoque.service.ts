import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estoque } from '../../entities/estoque.entity';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private estoqueRepository: Repository<Estoque>,
  ) {}

  async findAll(): Promise<Estoque[]> {
    return this.estoqueRepository.find({ relations: ['produto'] });
  }

  async findOne(id: number): Promise<Estoque> {
    const estoque = await this.estoqueRepository.findOne({ 
      where: { id_estoque: id },
      relations: ['produto']
    });

    if (!estoque) {
      throw new NotFoundException(`Estoque with ID "${id}" not found`);
    }
    return estoque;
  }

  async create(estoqueData: Estoque): Promise<Estoque> {
    return this.estoqueRepository.save(estoqueData);
  }

  async update(id: number, estoqueData: Partial<Estoque>): Promise<Estoque> {
    const existingEstoque = await this.findOne(id);

    if (!existingEstoque) {
      throw new NotFoundException(`Estoque with ID "${id}" not found`);
    }

    await this.estoqueRepository.update({ id_estoque: id }, estoqueData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // This will throw NotFoundException if the item doesn't exist
    await this.estoqueRepository.delete({ id_estoque: id });
  }
}
