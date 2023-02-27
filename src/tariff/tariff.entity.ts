// import { TariffEnum } from 'src/enums/tariff.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class TariffEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;
}
