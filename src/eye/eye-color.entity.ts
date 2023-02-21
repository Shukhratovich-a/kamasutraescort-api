import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('eyes', {
  orderBy: {
    id: 'ASC',
  },
})
@Index(['eyeColorNameEn', 'eyeColorNameRu'], { unique: true })
export class EyeColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 32, unique: true })
  eyeColorNameEn: string;

  @Column({ type: 'varchar', nullable: false, length: 32, unique: true })
  eyeColorNameRu: string;

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
