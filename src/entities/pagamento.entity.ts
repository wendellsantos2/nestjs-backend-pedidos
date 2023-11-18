// src/pagamento/pagamento.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
 

@Entity('PAGAMENTO')
export class Pagamento {
  @PrimaryGeneratedColumn()
  id_pagamento: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  data_pagamento: Date;

  @Column({ length: 50 })
  tipo: string;

  @Column({ length: 50 })
  status: string;

  @Column({ nullable: true }) // If 'numero_parcelas' can be null
  numero_parcelas: number;

  @ManyToOne(() => Pedido, pedido => pedido.pagamentos)
  @JoinColumn({ name: 'id_pedido' }) // Specify the column name for joining
  pedido: Pedido;

  @Column({ nullable: false })
  id_pedido: number; // This line maps the pedido ID and ensures it is not nullable
}
