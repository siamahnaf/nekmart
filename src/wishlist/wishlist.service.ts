import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Orm entity
import { Wishlist } from "./model/wishlist.entity";

//Dto
import { WishlistInput } from "./dto/wishlist.dto";

//Req User Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class WishlistService {
    //Constructor
    constructor(
        @InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>
    ) { };

    //Get wishlist
    async get(reqUser: ReqUser) {
        const wishlist = await this.wishlistRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            relations: {
                product: true,
                user: true
            }
        });
        return wishlist;
    }

    //Check Wishlist
    async check(reqUser: ReqUser, productId: string) {
        const wishlist = await this.wishlistRepository.findOneBy({
            user: { id: reqUser.id },
            product: { id: productId }
        });
        if (wishlist) return {
            status: true,
            message: "Product has in wishlist!"
        }
        else return {
            status: false,
            message: "Product has not in wishlist!"
        }
    };

    //Add wishlist
    async add(wishlistInput: WishlistInput, reqUser: ReqUser) {
        const wishlist = await this.wishlistRepository.findOneBy({
            user: { id: reqUser.id },
            product: { id: wishlistInput.productId }
        });
        if (wishlist) {
            await this.wishlistRepository.delete({
                user: { id: reqUser.id },
                product: { id: wishlistInput.productId }
            });
            return {
                success: true,
                message: "Product delete from wishlist successfully!"
            }
        } else {
            const newWishlist = this.wishlistRepository.create({
                product: { id: wishlistInput.productId },
                user: { id: reqUser.id }
            });
            await this.wishlistRepository.save(newWishlist);
            return {
                success: true,
                message: "Product added to wishlist successfully!"
            }
        }
    }

    //Delete Wishlist
    async delete(id: string) {
        try {
            const result = await this.wishlistRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Wishlist not found!");
        } catch {
            throw new NotFoundException("Cannot delete wishlist because it has related record!");
        }
        return {
            success: true,
            message: "Wishlist Deleted Successfully!"
        }
    }
}