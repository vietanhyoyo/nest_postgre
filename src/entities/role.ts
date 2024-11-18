import { IsString  } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Permission } from './permission';

@Entity('role', { schema: 'public' })
export class Role {
  @PrimaryColumn('varchar')
  @IsString()
  name: string;

  @Column('varchar')
  @IsString()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permissions', // Tên bảng liên kết (có thể tự đặt tên)
    joinColumn: { name: 'role_name', referencedColumnName: 'name' }, // Liên kết tới cột 'name' của bảng Role
    inverseJoinColumn: { name: 'permission_name', referencedColumnName: 'name' }, // Liên kết tới cột 'name' của bảng Permission
  })
  permissions: Permission[];
}
