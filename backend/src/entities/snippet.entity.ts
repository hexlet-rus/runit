import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from './user.entity';

@Entity('snippets')
export class Snippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  slug: string;

  @Column('text', { default: 'Untitled' })
  name: string;

  @Column('text')
  code: string;

  @Column('text')
  language: string;

  @ManyToOne('User', 'snippets')
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
