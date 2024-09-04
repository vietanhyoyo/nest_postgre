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
