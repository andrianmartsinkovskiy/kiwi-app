import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @OneToOne(() => Users)
  @JoinColumn()
  users: Users;
}
