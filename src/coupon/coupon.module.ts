import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm
import { Coupon } from "./model/coupon.entity";
import { UsedCoupon } from "./model/used.entity";

//Service and Resolver
import { CouponService } from "./coupon.service";
import { CouponResolver } from "./coupon.resolver";

//Modules
import { UserModule } from "src/user/user.module";
import { PointModule } from "@/points/points.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Coupon, UsedCoupon]),
        UserModule,
        PointModule
    ],
    providers: [CouponService, CouponResolver]
})

export class CouponModule { };