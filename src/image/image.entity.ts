import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', nullable: true })
  profileImageFirst?: string;

  @Column({ type: 'varchar', nullable: true })
  profileImageSecond?: string;

  @Column({ type: 'varchar', nullable: true })
  profileImageThirth?: string;

  @Column({ type: 'varchar', nullable: true })
  profileImageFourth?: string;

  @OneToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
