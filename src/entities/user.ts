import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusUser } from '../common/enum/user.enum';
import { Role } from './role';

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

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_name',
      referencedColumnName: 'name',
    },
  })
  role: Role[];

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
