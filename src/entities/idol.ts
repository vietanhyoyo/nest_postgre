import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag';

@Entity('idol', { schema: 'public' })
export class Idol {
  @PrimaryGeneratedColumn()
  @IsNumber()
  idol_id: number;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  detail: string;

  @Column('text', { array: true })
  @IsString({ each: true })
  images: string[];

  @ManyToMany(() => Tag, (tag) => tag.idols)
  @JoinTable({
    name: 'idol_tags',
    joinColumn: { name: 'idol_id', referencedColumnName: 'idol_id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'tag_id' },
  })
  tags: Tag[];

  @Column('text', { array: true })
  @IsString({ each: true })
  bio_link: string[];
}
