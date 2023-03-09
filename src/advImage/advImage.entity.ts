import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { AdvertisementEntity } from "src/advertisement/advertisement.entity";

@Entity("advImages", {
  orderBy: {
    createdAt: "ASC",
  },
})
export class AdvImageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  first: string;

  @Column({ type: "varchar", nullable: true })
  second: string;

  @Column({ type: "varchar", nullable: true })
  third: string;

  @Column({ type: "varchar", nullable: true })
  fourth: string;

  @OneToOne(() => AdvertisementEntity, (advertisement) => advertisement, { nullable: false })
  @JoinColumn({ name: "advertisementId" })
  advertisement: AdvertisementEntity;

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
