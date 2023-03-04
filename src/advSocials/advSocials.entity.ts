import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "src/user/user.entity";

@Entity("socials")
export class SocialsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  telegram: string;

  @Column({ type: "varchar", nullable: true })
  whastapp: string;

  @Column({ type: "varchar", nullable: true })
  instagram: string;

  @Column({ type: "varchar", nullable: true })
  facebook: string;

  @Column({ type: "varchar", nullable: true })
  twitter: string;

  @Column({ type: "varchar", nullable: true })
  tiktok: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @OneToOne(() => UserEntity, (user) => user.id, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

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
