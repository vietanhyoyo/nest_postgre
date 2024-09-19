import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Idol } from './idol';
import { News } from './news';

@Entity('tag', { schema: 'public' })
export class Tag {
  @PrimaryGeneratedColumn()
  @IsNumber()
  tag_id: number;

  @Column()
  @IsString()
  tag_name: string;

  @ManyToMany(() => Idol, (idol) => idol.tags)
  idols: Idol[];

  @ManyToMany(() => News, (news) => news.tags)
  news: News[];
}
