import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupons } from './coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupons)
    private readonly couponRepo: Repository<Coupons>,

  ) { }

  async getCoupons(){
    return await this.couponRepo.find();
  }

}
