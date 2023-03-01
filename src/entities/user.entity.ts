import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserToken } from './user-token.entity';
import { UserRole } from 'src/types/user-roles.type';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: true })
  isAuthenticated: boolean;

  @Column({ type: 'varchar', default: '' })
  file: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.LEGAL,
  })
  role: UserRole;

  @OneToOne(() => UserToken, (userToken) => userToken.users)
  userToken: UserToken;
}
