import { Module, Controller, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Products } from './products/product.entity';
import { UserModule } from './users/user.module';
import { ProductModule } from './products/product.module';
import { AddressModule } from './address/address.module';
import { Address } from './address/address.entity';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './cart/entities/cartitem.entity';
import { CartModule } from './cart/cart.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { OrderTracking } from './orders/entities/order-tracking.entity';
import { OrderModule } from './orders/order.module';
import { Wishlist } from './wishlist/wishlist.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { Images } from './images/image.entity';
import { Coupons } from './coupons/coupon.entity';
import { ImageModule } from './images/image.module';
import { CouponModule } from './coupons/coupon.module';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

@Controller()
class AppController {
  @Get()
  root() {
    return { message: 'NestJS Todo Backend is running!' };
  }
}

@Module({
  imports: [
    // 1. Initialize ConfigModule
    ConfigModule.forRoot({
      isGlobal: true, // Makes variables available everywhere
    }),

    // 2. Use forRootAsync to inject ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl: {
          rejectUnauthorized: false, // Required for Aiven
        },
        entities: [
          User, Products, Address, Cart, CartItem, 
          Order, OrderItem, OrderTracking, Wishlist, 
          Images, Coupons
        ],
        synchronize: false, // Keep false for production safety
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      }),
    }),
    
    // ... your other modules ...
    UserModule,
    ProductModule,
    AddressModule,
    CartModule,
    OrderModule,
    WishlistModule,
    ImageModule,
    CouponModule,
  ],
  controllers: [AppController],
})
export class AppModule { }