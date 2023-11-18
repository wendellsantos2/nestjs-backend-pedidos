import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
 

@Entity('NotaFiscal')
export class NotaFiscal {
  @PrimaryGeneratedColumn()
  id_nota_fiscal: number;

  @ManyToOne(() => Pedido, pedido => pedido.notasFiscais)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @Column({ length: 20, nullable: true })
  numero_nota_fiscal: string;

  @Column({ length: 5, nullable: true })
  serie_nota_fiscal: string;

  @Column({ length: 44, nullable: true })
  chave_acesso: string;

  @CreateDateColumn()
  data_emissao: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_produtos: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
  valor_taxas: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_total: number;

  @Column('text', { nullable: true })
  dados_adicionais: string;

  @Column({ length: 14 })
  cnpj_emitente: string;

  @Column({ length: 20, nullable: true })
  inscricao_estadual_emitente: string;
}
