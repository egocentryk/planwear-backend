import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { classToPlain } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import slugify from '@helpers/slugify';

import { Abstract } from '@entities/abstract.entity';
import { Comment } from '@entities/comment.entity';
import { Photo } from '@entities/photo.entity';
import { Tag } from '@entities/tag.entity';
import { User } from '@entities/user.entity';

@Entity('articles')
export class Article extends Abstract {
  @Column()
  @IsNotEmpty()
  title: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug: string;

  @Column({
    nullable: true
  })
  content: string;

  @Column({ default: 0 })
  recommendations: number;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @OneToMany(() => Photo, (photo) => photo.article)
  photos: Photo[]

  @ManyToMany(
    (type) => Tag,
    (tag) => tag.articles,
    {
      cascade: true,
    }
  )
  @JoinTable()
  tags: Tag[];

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJSON() {
    return classToPlain(this);
  }
}
