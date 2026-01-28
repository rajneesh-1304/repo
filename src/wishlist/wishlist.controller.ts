import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistDefinition } from './wishlistDTO';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get(':id')
  getWishlistById(@Param('id') id: string) {
    return this.wishlistService.getWishlistById(+id);
  }

  @Post()
  addInWishlist(@Body() data: WishlistDefinition) {
    return this.wishlistService.addInWishlist(data);
  }

  @Delete()
  deleteItemWishlist(@Body() data: WishlistDefinition) {
    return this.wishlistService.deleteItem(data);
  }

  // @Get()
  // getWishList() {
  //   return this.wishlistService.getWishlist();
  // }
}
