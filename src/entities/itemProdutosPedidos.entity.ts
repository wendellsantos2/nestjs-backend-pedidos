import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Desconto } from './descontos.entity';
import { Pedido } from './pedido.entity';
import { Produto } from './produto.entity';
 

@Entity('ITEM_PRODUTOS_PEDIDOS')
export class ItemProdutosPedidos {
  // Explicitly defining the type ensures consistency with the database schema.
  @PrimaryColumn({ type: 'int' })
  id_produto: number;

  @PrimaryColumn({ type: 'int' })
  id_pedido: number;

  // Utilize a consistent style for column definitions.
  @Column({ type: 'varchar', length: 255 })
  qrcode: string;

  @Column({ type: 'int' })
  quantidade: number;

  // The precision and scale define the maximum number of digits and the number of digits after the decimal point.
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_unitario: number;

  // Establishes a many-to-one relationship with Produto.
  @ManyToOne(() => Produto, { eager: true })
  @JoinColumn({ name: 'id_produto' })
  produto: Produto;

  // Establishes a many-to-one relationship with Pedido.
  @ManyToOne(() => Pedido, { eager: true })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  // If a discount is not always applicable, ensure this is nullable. Otherwise, remove the nullable option.
  @ManyToOne(() => Desconto, { nullable: true })
  @JoinColumn({ name: 'desconto_id' })
  desconto?: Desconto; // If nullable, indicate with a TypeScript optional type (?).
}
