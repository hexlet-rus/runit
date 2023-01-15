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

  @Column('text')
  slug: string;

  @Column('text', { default: 'Untitled' })
  name: string;

  @Column('text')
  code: string;

  @ManyToOne('Users', 'snippets', { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
