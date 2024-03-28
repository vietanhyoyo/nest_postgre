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
import { Customer } from './customer';

@Entity('receiving_place', { schema: 'public' })
export class ReceivingPlace {
  @PrimaryGeneratedColumn()
  @IsNumber()
  receiving_place_id: number;

  @Column()
  @IsString()
  receiving_place_name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  phone_number: string;

  @Column()
  @IsString()
  email: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

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
