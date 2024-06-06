import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { encrypt } from '../users/secure/encrypt';
import { Snippet } from './snippet.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Index('text', { unique: true })
  @Column()
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Snippet, (snippet) => snippet.user)
  snippets: Snippet[];

  @Column({ nullable: true })
  recover_hash: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = encrypt(this.password);
  }

  private tempPassword: string;

  @AfterLoad()
  async loadTempPassword() {
    this.tempPassword = this.password;
  }

  @BeforeUpdate()
  async hashPasswordIfNew() {
    if (this.tempPassword !== this.password) {
      this.password = encrypt(this.password);
    }
  }
}
