// cozinha.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
 
 
@Entity('COZINHA')
export class Cozinha {
  @PrimaryGeneratedColumn()
  id_cozinha: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ unique: true, nullable: false })
  cpf: string;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User; // Esta é a referência à entidade User, que corresponde à chave estrangeira 'id_usuario'.
}
