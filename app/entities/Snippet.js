import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Snippet {
  @PrimaryGeneratedColumn()
  id = null;

  @Column('varchar')
  language = '';

  constructor(attrs = {}) {
    this.language = attrs.language;
  }
}

export default Snippet;
