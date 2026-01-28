import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wishlist')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;
}
