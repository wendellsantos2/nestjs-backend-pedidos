import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from 'src/entities/categoria.entity';
import { CreateCategoriaDto } from './dto/createCategoriaDto';
import { UpdateCategoriaDto } from './dto/UpdateCategoriaDto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    await this.categoriaRepository.save(categoria);
    return categoria;
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

 async findOne(id_categoria: string): Promise<Categoria> {
    // Use findOne with FindOneOptions
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria } });

    if (!categoria) {
      throw new NotFoundException(`Categoria with ID "${id_categoria}" not found`);
    }
    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id); // Reutiliza o método findOne para verificar se a categoria existe
    if (!categoria) {
      throw new NotFoundException(`Categoria with ID "${id}" not found`);
    }

    // Atualiza a categoria com os novos dados
    this.categoriaRepository.merge(categoria, updateCategoriaDto);
    await this.categoriaRepository.save(categoria);

    return categoria;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria with ID "${id}" not found`);
    }
  }
}
