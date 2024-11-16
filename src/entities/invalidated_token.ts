import { IsDate, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('invalidated_token', { schema: 'public' })
export class InvalidatedToken {
  @PrimaryColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsDate()
  expiry_time: Date;
}
