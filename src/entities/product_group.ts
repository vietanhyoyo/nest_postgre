import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_group', { schema: 'public' })
export class ProductGroup {
  @PrimaryGeneratedColumn()
  @IsNumber()
  product_group_id: number;

  @Column()
  @IsString()
  product_group_name: string;

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
