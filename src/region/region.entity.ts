import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('regions', {
  orderBy: {
    id: 'ASC',
  },
})
@Index(['nameEn', 'nameRu'])
export class RegionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 64, unique: true })
  nameEn: string;

  @Column({ type: 'varchar', nullable: false, length: 64, unique: true })
  nameRu: string;

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
