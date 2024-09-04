import { IsDate, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Warehouse } from './warehouse';
import { ReceivingPlace } from './receiving_place';

@Entity('export_invoice', { schema: 'public' })
export class ExportInvoice {
  @PrimaryGeneratedColumn()
  @IsNumber()
  export_invoice_id: number;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @ManyToOne(() => ReceivingPlace)
  @JoinColumn({ name: 'receiving_place_id' })
  receiving_place: ReceivingPlace;

  @Column({ type: 'float' })
  @IsNumber()
  total_price: number;

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
