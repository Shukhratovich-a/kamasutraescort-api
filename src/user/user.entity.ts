import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GenderEnum } from 'src/enums/gender.enum';
import { HairEntity } from 'src/hair/hair.entity';
import { EyeColorEntity } from 'src/eye/eye-color.entity';
import { GoalEntity } from 'src/goal/goal.entity';
import { RegionEntity } from 'src/region/region.entity';
import { ImageEntity } from 'src/image/image.entity';
import { SocialsEntity } from 'src/socials/socials.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 32, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false, length: 128, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 128 })
  password: string;

  @Column({ type: 'enum', nullable: false, enum: GenderEnum })
  gender: GenderEnum;

  @Column({ type: 'timestamp', nullable: false })
  birthDate: Date;

  @Column({ type: 'varchar', nullable: true, length: 128 })
  fullname: string;

  @Column({ type: 'numeric', nullable: true })
  height: number;

  @Column({ type: 'numeric', nullable: true })
  weight: number;

  @Column({ type: 'varchar', nullable: true, length: 1024 })
  about: string;

  @ManyToOne(() => RegionEntity, (region) => region.id, { nullable: false })
  @JoinColumn({ name: 'reigonId' })
  region: number;

  @ManyToOne(() => GoalEntity, (goal) => goal.id, { nullable: true })
  @JoinColumn({ name: 'goalId' })
  goal: number;

  @ManyToOne(() => HairEntity, (hair) => hair.id, { nullable: true })
  @JoinColumn({ name: 'hairColorId' })
  hairColor: number;

  @ManyToOne(() => EyeColorEntity, (eye) => eye.id, { nullable: true })
  @JoinColumn({ name: 'eyeColorId' })
  eyeColor: number;

  @OneToOne(() => ImageEntity, (image) => image.user, { nullable: true })
  @JoinColumn({ name: 'imageId' })
  images: number;

  @OneToOne(() => SocialsEntity, (socials) => socials.id, { nullable: true })
  @JoinColumn({ name: 'socialsIs' })
  socials: number | null;

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
