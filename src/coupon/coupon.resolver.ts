import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { CouponService } from "./coupon.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { RedeemInfo } from "./entities/redeem.entity";
import { ApplyInfo } from "./entities/apply.entity";
import { CouponUser } from "./entities/coupon-user.entity";
import { CouponAdmin, GetCoupons } from "./entities/coupon-admin.entity";

//Dto
import { CouponInput } from "./dto/coupon.dto";
import { RedeemInput } from "./dto/redeem.dto";
import { ApplyInput } from "./dto/apply.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Resolver()
export class CouponResolver {
    //Constructor
    constructor(
        private readonly couponService: CouponService
    ) { };

    //Get Coupon by User
    @Query(() => [CouponUser], { name: "getCouponByUser" })
    @UseGuards(AuthGuard)
    getByUser(
        @Context("user") reqUser: ReqUser
    ) {
        return this.couponService.getByUser(reqUser);
    };

    //Get Coupon by admin
    @Query(() => GetCoupons, { name: "getCouponByAdmin" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getByAdmin(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.couponService.getByAdmin(searchInput);
    }

    //Get Single Coupon by admin
    @Query(() => CouponAdmin, { name: "getSingleCouponByAdmin" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getSingleByAdmin(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.couponService.getSingleByAdmin(id);
    }

    //Add Coupon
    @Mutation(() => SuccessInfo, { name: "addCoupon" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("couponInput") couponInput: CouponInput
    ) {
        return this.couponService.add(couponInput);
    };

    //Redeem Coupon
    @Mutation(() => RedeemInfo, { name: "redeemCoupon" })
    @UseGuards(AuthGuard)
    redeem(
        @Args("redeemInput") redeemInput: RedeemInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.couponService.redeem(redeemInput, reqUser);
    }

    //Update Coupon
    @Mutation(() => SuccessInfo, { name: "updateCoupon" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("couponInput") couponInput: CouponInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.couponService.update(couponInput, id);
    };

    //Apply Coupon
    @Mutation(() => ApplyInfo, { name: "applyCoupon" })
    @UseGuards(AuthGuard)
    apply(
        @Args("applyInput") applyInput: ApplyInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.couponService.apply(applyInput, reqUser);
    }

    //Delete Coupon
    @Mutation(() => SuccessInfo, { name: "deleteCoupon" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.couponService.delete(id);
    };
}