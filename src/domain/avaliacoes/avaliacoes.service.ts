import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 
import { CreateAvaliacaoDTO } from './dto/CreateAvaliacaoDto';
import { Avaliacao } from 'src/entities/avaliacoes.entity';
 

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async findAll(): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.find();
  }

  async findOne(id: number): Promise<Avaliacao> {
    const avaliacao = await this.avaliacaoRepository.findOne({ where: { id_avaliacao: id } });

    if (!avaliacao) {
      throw new NotFoundException(`Avaliacao with ID "${id}" not found`);
    }
    return avaliacao;
  }

  async create(avaliacaoData: CreateAvaliacaoDTO): Promise<Avaliacao> {
    const newAvaliacao = this.avaliacaoRepository.create(avaliacaoData);
    return this.avaliacaoRepository.save(newAvaliacao);
  }

  async update(id: number, avaliacaoData: CreateAvaliacaoDTO): Promise<Avaliacao> {
    const avaliacao = await this.findOne(id);

    if (!avaliacao) {
      throw new NotFoundException(`Avaliacao with ID "${id}" not found`);
    }

    Object.assign(avaliacao, avaliacaoData);
    return this.avaliacaoRepository.save(avaliacao);
  }

  async remove(id: number): Promise<void> {
    const avaliacao = await this.findOne(id);

    if (!avaliacao) {
      throw new NotFoundException(`Avaliacao with ID "${id}" not found`);
    }

    await this.avaliacaoRepository.delete(id);
  }
}
