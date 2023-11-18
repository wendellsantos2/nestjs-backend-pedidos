import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { ItemProdutosPedidos } from './itemProdutosPedidos.entity';
 

@Entity('PRODUTOS')
export class Produto {
  @PrimaryGeneratedColumn()
  id_produto: number;

  @Column({ length: 255 })
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column('int')
  estoque: number; // Make sure to have this column if it's needed, as per your TypeScript entity

  @Column('text', { nullable: true }) // If the 'imagem_url' can be null, add the nullable property
  imagem_url: string;
  
  @OneToMany(() => ItemProdutosPedidos, itemPedido => itemPedido.produto)
  itemPedidos: ItemProdutosPedidos[];

  @ManyToOne(() => Categoria, categoria => categoria.produtos)
  @JoinColumn({ name: 'categoria_id' }) // Add this to specify the foreign key column
  categoria: Categoria;

  @Column() // Add this if you need direct access to the foreign key column
  categoria_id: number; // This represents the foreign key column 'categoria_id'
}
