import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from './gender.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.Male })
  gender: GenderEnum;
}
