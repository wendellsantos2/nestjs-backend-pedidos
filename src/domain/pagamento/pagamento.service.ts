import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pagamento } from 'src/entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/pagamento.dto';
 
 
 

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const pagamento = this.pagamentoRepository.create(createPagamentoDto);
    await this.pagamentoRepository.save(pagamento);
    return pagamento;
  }

  async findAll(): Promise<Pagamento[]> {
    return await this.pagamentoRepository.find();
  }

  async findOne(id_pagamento: number, id_pedido: number): Promise<Pagamento> {
    const pagamento = await this.pagamentoRepository.findOne({ 
      where: { 
        id_pagamento: id_pagamento,
        id_pedido: id_pedido
      } 
    });
  
    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID de pagamento "${id_pagamento}" e ID de pedido "${id_pedido}" não encontrado`);
    }
    return pagamento;
  }

  
async update(id_pagamento: number, id_pedido: number, updatePagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const pagamento = await this.findOne(id_pagamento, id_pedido);
    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID de pagamento "${id_pagamento}" e ID de pedido "${id_pedido}" não encontrado`);
    }
  
    this.pagamentoRepository.merge(pagamento, updatePagamentoDto);
    await this.pagamentoRepository.save(pagamento);
  
    return pagamento;
  }
  
  async remove(id_pagamento: number, id_pedido: number): Promise<void> {
    const resultado = await this.pagamentoRepository.delete({ id_pagamento, id_pedido });
    if (resultado.affected === 0) {
      throw new NotFoundException(`Pagamento com ID de pagamento "${id_pagamento}" e ID de pedido "${id_pedido}" não encontrado`);
    }
  }
  
}
