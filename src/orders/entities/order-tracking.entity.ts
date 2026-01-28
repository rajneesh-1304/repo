import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_tracking')
export class OrderTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.tracking, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column({ default: 'INPROCESS' })
  status: 'INPROCESS' | 'CANCELLED' | 'SHIPPED';

  @CreateDateColumn()
  createdAt: Date;
}
