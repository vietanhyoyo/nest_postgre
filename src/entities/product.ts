import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductGroup } from './product_group';
import { Warehouse } from './warehouse';

@Entity('product', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn()
  @IsNumber()
  product_id: number;

  @Column()
  @IsString()
  product_name: string;

  @Column({ type: 'float' })
  @IsNumber()
  price: number;

  @ManyToOne(() => ProductGroup)
  @JoinColumn({ name: 'product_group_id' })
  product_group: ProductGroup;

  @Column()
  @IsString()
  image: string;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @Column()
  @IsNumber()
  amount: number;

  @Column()
  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @IsDate()
  createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @IsDate()
  updatedAt: Date;
}
