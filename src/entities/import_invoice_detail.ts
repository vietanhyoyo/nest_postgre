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
import { ImportInvoice } from './import_invoice';

@Entity('import_invoice_detail', { schema: 'public' })
export class ImportInvoiceDetail {
  @PrimaryGeneratedColumn()
  @IsNumber()
  import_invoice_detail_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ImportInvoice)
  @JoinColumn({ name: 'import_invoice_id' })
  import_invoice: ImportInvoice;

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
