import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('socials')
export class SocialsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  telegram: string;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  whatsapp: string;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  instagram: string;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  facebook: string;

  @OneToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updateAt: Date;
}
