import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.entity';
 
@Entity('ESTOQUE')
export class Estoque {
    @PrimaryGeneratedColumn()
    id_estoque: number;

    @ManyToOne(() => Produto, produto => produto.estoque)
    @JoinColumn({ name: 'id_produto' })
    produto: Produto;

    @Column('int')
    quantidade: number;
}
