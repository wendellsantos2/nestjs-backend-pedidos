import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.entity';
import { User } from './user.entity';

@Entity('AVALIACOES')
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id_avaliacao: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @ManyToOne(() => Produto, { nullable: false })
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column({ nullable: false })
  avaliacao: number;

  @Column('text')
  comentario: string;
}
