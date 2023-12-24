import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, IsNull } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Orm Entity
import { Coupon } from "./model/coupon.entity";
import { UsedCoupon } from "./model/used.entity";
import { UserPoints } from "@/points/model/user-point.entity";

//Dto
import { CouponInput } from "./dto/coupon.dto";
import { RedeemInput } from "./dto/redeem.dto";
import { ApplyInput } from "./dto/apply.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class CouponService {
    //Constructor
    constructor(
        @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
        @InjectRepository(UsedCoupon) private usedCouponRepository: Repository<UsedCoupon>,
        @InjectRepository(UserPoints) private pointRepository: Repository<UserPoints>
    ) { };

    //Get Coupon by user
    async getByUser(reqUser: ReqUser) {
        const coupon = await this.couponRepository.find({
            where: {
                createdBy: { id: reqUser.id }
            }
        });
        return coupon;
    }

    //Get Coupon by admin
    async getByAdmin(searchInput: SearchInput) {
        const coupons = await this.couponRepository
            .createQueryBuilder("coupon")
            .andWhere("coupon.expires IS NOT NULL")
            .andWhere("coupon.createdBy IS NULL")
            .orderBy("coupon.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            coupons.where("LOWER(coupon.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Coupon>(coupons, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get Single coupon by admin
    async getSingleByAdmin(id: string) {
        const coupon = await this.couponRepository.findOne({
            where: {
                id,
                expires: Not(IsNull()),
                createdBy: IsNull()
            }
        });
        if (!coupon) throw new NotFoundException("Coupon not found!");
        return coupon;
    }

    //Add Coupon
    async add(couponInput: CouponInput) {
        const coupon = await this.couponRepository.findOneBy({
            code: couponInput.code
        });
        if (coupon) throw new NotFoundException("Coupon already exist!");
        const newCoupon = this.couponRepository.create(couponInput);
        await this.couponRepository.save(newCoupon);
        return {
            success: true,
            message: "Coupon added successfully!"
        }
    }

    //Redeem Coupon
    async redeem(redeemInput: RedeemInput, reqUser: ReqUser) {
        const userPoints = await this.pointRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        if (userPoints.points < redeemInput.points) throw new NotFoundException("You have not enough points!");
        const generateRandomText = () => Array.from({ length: 8 }, () => Math.random() < 0.5 ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');

        const newCoupon = this.couponRepository.create({
            discount: redeemInput.discount.toString(),
            minimumPurchase: redeemInput.minPurchase.toString(),
            points: redeemInput.points.toString(),
            name: generateRandomText(),
            code: generateRandomText(),
            discountUnit: "flat",
            createdBy: { id: reqUser.id }

        });
        await this.couponRepository.save(newCoupon);
        await this.pointRepository.decrement({
            user: { id: reqUser.id }
        }, "points", redeemInput.points);

        return {
            success: true,
            message: "Redeem Successful!",
            code: generateRandomText()
        }
    }

    //Update Coupon
    async update(couponInput: CouponInput, id: string) {
        const coupon = await this.couponRepository.findOneBy({
            id
        });
        if (!coupon) throw new NotFoundException("Coupon not found!");
        if (coupon.code !== couponInput.code) {
            const hasCoupon = await this.couponRepository.findOneBy({
                code: couponInput.code
            });
            if (hasCoupon) throw new NotFoundException("Coupon code is already in use!");
        }
        await this.couponRepository.update(id, couponInput);
        return {
            success: true,
            message: "Coupon updated successfully!"
        }
    };

    //Apply Coupon
    async apply(applyInput: ApplyInput, reqUser: ReqUser) {
        const coupon = await this.couponRepository.findOne({
            where: {
                code: applyInput.code
            }
        });
        if (Number(applyInput.minPurchase) < Number(coupon.minimumPurchase)) throw new NotFoundException(`You need to buy minimum ${coupon.minimumPurchase} taka!`);
        const alreadyUsed = await this.usedCouponRepository.findOne({
            where: {
                user: { id: reqUser.id },
                code: coupon.id
            }
        });
        if (alreadyUsed) throw new NotFoundException("You already used this coupon!");
        let discount;
        if (coupon.discountUnit === "flat") {
            discount = coupon.discount
        } else {
            discount = Number(applyInput.minPurchase) * (Number(coupon.discount) / 100)
        };
        if (coupon?.createdBy) {
            if (coupon.createdBy.id.toString() !== reqUser.id.toString()) throw new NotFoundException("Something went wrong!");
        }
        if (coupon.expires) {
            const now = new Date();
            if (now > coupon.expires) throw new NotFoundException("The code is expired!");
        }
        const newUsed = this.usedCouponRepository.create({
            code: coupon.id,
            discount: coupon.discount,
            discountUnit: coupon.discountUnit,
            user: { id: reqUser.id }
        });
        await this.usedCouponRepository.save(newUsed);
        return {
            success: true,
            message: "Coupon code applied successfully!",
            discount
        }
    }

    //Delete Coupon 
    async delete(id: string) {
        try {
            const result = await this.couponRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Coupon not found!");
        } catch {
            throw new NotFoundException("Cannot delete coupon because it has related record!");
        }
        return {
            success: true,
            message: "Coupon Deleted Successfully!"
        }
    }
}