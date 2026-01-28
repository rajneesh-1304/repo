import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
