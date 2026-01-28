import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber, IsOptional, IsArray, ArrayNotEmpty
} from 'class-validator';

export class Address{
  
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  pincode: number;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  landmark?: string;
}