import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './wishlist.entity';
import { Products } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Products])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
