import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Products } from '../products/product.entity';
import { WishlistDefinition } from './wishlistDTO';

@Injectable()
export class WishlistService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
  ) {}

  async addInWishlist(data: WishlistDefinition) {
    const existingItem = await this.wishlistRepo.findOne({
      where: { userId: data.userId, productId: data.productId },
    });

    if (existingItem) {
      throw new ConflictException('Item already present in wishlist');
    }

    const wishlistItem = this.wishlistRepo.create({
      userId: data.userId,
      productId: data.productId,
    });

    await this.wishlistRepo.save(wishlistItem);
    return { message: 'Added to wishlist' };
  }

  async getWishlist() {
    return await this.wishlistRepo.find();
  }

  async getWishlistById(userId: number) {
    const wishlistItems = await this.wishlistRepo.find({ where: { userId } });

    const products = await Promise.all(
      wishlistItems.map(async (item) => {
        const product = await this.productRepo.findOne({
          where: { id: item.productId },
        });
        return product; 
      }),
    );

    return products.filter((p): p is Products => p !== null);
  }

  async deleteItem(data: WishlistDefinition) {
    const item = await this.wishlistRepo.findOne({
      where: { userId: data.userId, productId: data.productId },
    });

    if (!item) {
      throw new NotFoundException('Item not found in wishlist');
    }

    await this.wishlistRepo.remove(item);
    return { message: 'Removed from wishlist' };
  }
}
