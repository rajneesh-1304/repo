import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber, IsOptional, IsArray, ArrayNotEmpty
} from 'class-validator';

export class ProductDefinition {
  
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  sellerId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'rating must be a valid decimal number' },
  )
  rating: number;

  @IsOptional()
  images: string[];

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subcategory: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  quantity?: number;
}