import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'CUSTOMER' })
  role: 'ADMIN' | 'SELLER' | 'CUSTOMER';

  @Column({ default: false })
  is_banned: boolean;
}