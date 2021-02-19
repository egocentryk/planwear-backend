import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import slugify from '../helpers/slugify';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug!: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  ownerId: number;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }
}
