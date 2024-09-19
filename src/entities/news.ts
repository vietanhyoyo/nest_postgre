import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tag';

@Entity('News', { schema: 'public' })
export class News {
  @PrimaryGeneratedColumn()
  @IsNumber()
  news_id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  thumbnail: string;

  @Column({ default: '' })
  @IsString()
  author: string;

  @Column({ default: '' })
  @IsString()
  description: string;

  @Column()
  @IsString()
  content: string;

  @Column({ default: 0 })
  @IsNumber()
  views: number;

  @ManyToMany(() => Tag, (tag) => tag.news)
  @JoinTable({
    name: 'news_tags',
    joinColumn: { name: 'news_id', referencedColumnName: 'news_id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'tag_id' },
  })
  tags: Tag[];

  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  updatedAt: Date;
}
