import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Role from 'src/common/enum/role.enum';
import { StatusUser } from 'src/common/enum/user.enum';

@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  user_id: number;

  @Column()
  @IsString()
  user_name: string;

  @Column()
  @IsString()
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: StatusUser.ENABLE })
  @IsEnum(StatusUser)
  status: StatusUser;

  @Column()
  @IsEnum(Role)
  role: Role;

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
