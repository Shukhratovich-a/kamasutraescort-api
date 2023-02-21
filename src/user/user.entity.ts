import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GenderEnum } from 'src/enums/gender.enum';
import { HairEntity } from 'src/hair/hair.entity';
import { EyeColorEntity } from 'src/eye/eye-color.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 32, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  fullname: string;

  @Column({ type: 'varchar', nullable: false, length: 128, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  password: string;

  @Column({ type: 'timestamp', nullable: false })
  birthDate: Date;

  @Column({ type: 'enum', nullable: false, enum: GenderEnum })
  gender: GenderEnum;

  @Column({ type: 'numeric', nullable: true })
  height: number;

  @Column({ type: 'numeric', nullable: true })
  weight: number;

  @Column({ type: 'varchar', nullable: true, length: 1024 })
  about: string;

  @Column({ type: 'varchar', nullable: true, length: 256 })
  goal: string;

  @OneToOne(() => HairEntity, (hair) => hair.id)
  @JoinColumn()
  hairColor: HairEntity;

  @OneToOne(() => EyeColorEntity, (eye) => eye.id)
  @JoinColumn()
  eyeColor: HairEntity;

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
