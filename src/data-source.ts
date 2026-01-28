import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Products } from './products/product.entity';
import { Address } from './address/address.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cartitem.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderTracking } from './orders/entities/order-tracking.entity';
import { Wishlist } from './wishlist/wishlist.entity';
import { Images } from './images/image.entity';
import { Coupons } from './coupons/coupon.entity';
import * as dotenv from 'dotenv';
import { Module, Controller, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// ... Import all your entities ...

// Initialize dotenv to read the .env file
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '24950', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    User,
    Products,
    Address,
    Cart,
    CartItem,
    Order,
    OrderItem,
    OrderTracking,
    Wishlist,
    Images,
    Coupons,
  ],
  // Use .ts for development (ts-node) and .js for production (dist)
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;