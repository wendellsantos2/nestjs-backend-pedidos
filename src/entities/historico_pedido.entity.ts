import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
 
 
@Entity('HISTORICO_PEDIDO')
export class HistoricoPedido {
    @PrimaryGeneratedColumn()
    id_historico: number;

    @ManyToOne(() => Pedido, pedido => pedido.historicoPedidos)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido;

    @Column({ length: 50 })
    status_pedido: string;

    @CreateDateColumn()
    data_hora: Date;
}
