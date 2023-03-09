import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { TypeEnum } from "src/enums/type.enum";
import { HairEntity } from "src/hair/hair.entity";
import { EyeColorEntity } from "src/eye/eye-color.entity";
import { GoalEntity } from "src/goal/goal.entity";
import { UserEntity } from "src/user/user.entity";
import { AdvImageEntity } from "src/advImage/advImage.entity";

@Entity("advertisements")
export class AdvertisementEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  advName: string;

  @Column({ type: "varchar", nullable: false })
  searchName: string;

  @Column({ type: "timestamp", nullable: false })
  birthDate: Date;

  @Column({ type: "enum", nullable: false, enum: TypeEnum })
  type: TypeEnum;

  @ManyToOne(() => UserEntity, (user) => user.advertisments, { nullable: false })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ type: "varchar", nullable: true })
  fullname: string;

  @Column({ type: "numeric", nullable: true })
  height: number;

  @Column({ type: "numeric", nullable: true })
  weight: number;

  @Column({ type: "varchar", nullable: true, length: 1024 })
  about: string;

  @ManyToOne(() => GoalEntity, (goal) => goal.id, { nullable: true })
  @JoinColumn({ name: "goalId" })
  goal: GoalEntity;

  @ManyToOne(() => HairEntity, (hair) => hair.id, { nullable: true })
  @JoinColumn({ name: "hairColorId" })
  hairColor: HairEntity;

  @ManyToOne(() => EyeColorEntity, (eye) => eye.id, { nullable: true })
  @JoinColumn({ name: "eyeColorId" })
  eyeColor: EyeColorEntity;

  @OneToOne(() => AdvImageEntity, (image) => image, { nullable: true })
  @JoinColumn({ name: "imageId" })
  images: AdvImageEntity;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date;
}
