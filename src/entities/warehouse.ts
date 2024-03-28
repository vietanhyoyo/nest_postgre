import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('warehouse', { schema: 'public' })
export class Warehouse {
  @PrimaryGeneratedColumn()
  @IsNumber()
  warehouse_id: number;

  @Column()
  @IsString()
  warehouse_name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  phone_number: string;

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
