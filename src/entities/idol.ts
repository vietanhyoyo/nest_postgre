import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
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

@Entity('idol', { schema: 'public' })
export class Idol {
  @PrimaryGeneratedColumn()
  @IsNumber()
  idol_id: number;

  @Column()
  @IsString()
  idol_name: string;

  @Column()
  @IsString()
  slug: string;

  @Column()
  @IsString()
  thumbnail: string;

  @Column('text')
  @IsString()
  description: string;

  @Column('text')
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

  @Column({ default: true })
  @IsBoolean()
  is_banner?: boolean;

  @Column({ default: 0 })
  @IsNumber()
  views: number;

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
