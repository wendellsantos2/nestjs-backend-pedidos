// Ensure the path matches the location of your entity files
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
 
 

@Entity('PONTUACAO')
export class Pontuacao {
  @PrimaryGeneratedColumn()
  id_pontuacao: number;

 
  @Column({ nullable: false })
  pontos: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_compra: Date;

  
  @Column()
  usuario_id : number; // This will represent the foreign key column in the table
}
