import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GenderEnum } from 'src/enums/gender.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 32, nullable: false })
  username: string;

  @Column({ unique: true, type: 'varchar', length: 128, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  password: string;

  @Column({ type: 'timestamp', nullable: false })
  birthDate: Date;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.Male })
  gender: GenderEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
