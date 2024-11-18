import { IsString  } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('permission', { schema: 'public' })
export class Permission {
  @PrimaryColumn('varchar')
  @IsString()
  name: string;

  @Column('varchar')
  @IsString()
  description: string;
}
