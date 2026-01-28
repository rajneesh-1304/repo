import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coupons } from "./coupon.entity";
import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";

@Module({
    imports: [TypeOrmModule.forFeature([Coupons])],
    controllers:[CouponController],
    providers:[CouponService],
})

export class CouponModule {}