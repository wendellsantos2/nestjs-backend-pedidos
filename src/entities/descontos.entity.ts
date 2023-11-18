 
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('DESCONTOS')
export class Desconto {
  @PrimaryGeneratedColumn()
  id_desconto: number;

  @Column({ length: 50, unique: true })
  codigo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column('date')
  data_validade: Date;
}
