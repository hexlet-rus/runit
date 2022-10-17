import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Users } from './user.entity';

@Entity()
export class Snippets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Untitled' })
  name: string;

  @Column()
  code: string;

  @ManyToOne('Users', 'snippets')
  @JoinColumn()
  user: Users;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
