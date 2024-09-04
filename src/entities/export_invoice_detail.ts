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
import { Product } from './product';
import { ExportInvoice } from './export_invoice';

@Entity('export_invoice_detail', { schema: 'public' })
export class ExportInvoiceDetail {
  @PrimaryGeneratedColumn()
  @IsNumber()
  export_invoice_detail_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ExportInvoice)
  @JoinColumn({ name: 'export_invoice_id' })
  export_invoice: ExportInvoice;

  @Column()
  @IsNumber()
  amount: number;

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
