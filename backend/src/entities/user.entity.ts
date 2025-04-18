import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { encrypt } from '../users/secure/encrypt';
import type { Snippet } from './snippet.entity';
import type { UserSettings } from './user-settings.entity';

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

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @OneToMany('Snippet', 'user')
  snippets: Snippet[];

  @OneToOne('UserSettings', 'user')
  userSettings: UserSettings;

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
