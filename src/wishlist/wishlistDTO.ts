import { IsNotEmpty } from 'class-validator';

export class WishlistDefinition {

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number;
}
