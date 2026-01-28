import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sellerId:number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  rating: number;

  @Column()
  category: string;

  @Column()
  subcategory: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ default: true })
  isActive: boolean;

  @Column("simple-array", { nullable: true })
  images: string[];
}
