import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('supplier', { schema: 'public' })
export class Supplier {
  @PrimaryGeneratedColumn()
  @IsNumber()
  supplier_id: number;

  @Column()
  @IsString()
  supplier_name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  phone_number: string;

  @Column()
  @IsString()
  email: string;

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
