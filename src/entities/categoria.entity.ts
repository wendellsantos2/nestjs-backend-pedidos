// categoria.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from './produto.entity';
 

@Entity('CATEGORIA')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 255 })
  nome_categoria: string;

  @Column('text')
  descricao: string;

  // Relação OneToMany com a entidade Produto, onde cada categoria pode ter vários produtos
  @OneToMany(() => Produto, produto => produto.categoria)
  produtos: Produto[];
}
