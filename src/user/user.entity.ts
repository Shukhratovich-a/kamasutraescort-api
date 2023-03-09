import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { RegionEntity } from "src/region/region.entity";
import { AvatarEntity } from "src/avatar/avatar.entity";
import { SocialsEntity } from "src/socials/socials.entity";

import { RoleEnum } from "src/enums/role.enum";
import { AdvertisementEntity } from "src/advertisement/advertisement.entity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false, length: 32, unique: true })
  username: string;

  @Column({ type: "varchar", nullable: false, length: 128, unique: true })
  email: string;

  @Column({ type: "varchar", nullable: false, length: 128 })
  password: string;

  @Column({ type: "enum", nullable: false, enum: RoleEnum })
  role: RoleEnum;

  @Column({ type: "timestamp", nullable: false })
  birthDate: Date;

  @OneToMany(() => AdvertisementEntity, (advertisement) => advertisement, { nullable: true })
  @JoinColumn({ name: "advertisements" })
  advertisments: AdvertisementEntity[];

  @ManyToOne(() => RegionEntity, (region) => region.id, { nullable: false })
  @JoinColumn({ name: "reigonId" })
  region: number;

  @OneToOne(() => AvatarEntity, (avatar) => avatar.id, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "avatarId" })
  avatar: AvatarEntity;

  @OneToOne(() => SocialsEntity, (socials) => socials.id, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "socialsId" })
  socials: SocialsEntity;

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
