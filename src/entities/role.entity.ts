// role.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
 
 

@Entity('ROLES')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roleName: string;

  @OneToMany(() => User, usuario => usuario.id)
  usuarios: User[];
}
