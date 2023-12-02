// src/pedido/pedido.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/entities/pedido.entity';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/CreatePedidoDto';
 

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = this.pedidoRepository.create(createPedidoDto);
    return this.pedidoRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find();
  }
  
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({ where: { id_pedido: id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID "${id}" não encontrado`);
    }
    return pedido;
  }
  
  

  async update(id: number, createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID "${id}" não encontrado`);
    }
    this.pedidoRepository.merge(pedido, createPedidoDto);
    return this.pedidoRepository.save(pedido);
  }
  

  async remove(id: number): Promise<void> {
    const result = await this.pedidoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido com ID "${id}" não encontrado`);
    }
  }
}
