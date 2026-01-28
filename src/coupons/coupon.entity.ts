import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('coupons')
export class Coupons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  discount: number;
}
