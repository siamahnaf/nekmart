import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { WishlistService } from "./wishlist.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Wishlist } from "./entities/wishlist.entity";
import { CheckWishlist } from "./entities/check-wishlist.entity";

//Dto
import { WishlistInput } from "./dto/wishlist.dto";

//Guard
import { AuthGuard } from "@/auth/auth.guard";

//Req User Types
import { ReqUser } from "@/auth/entities/user.types";

@Resolver(Wishlist)
export class WishlistResolver {
    //Constructor
    constructor(
        private readonly wishlistService: WishlistService
    ) { };

    //Get wishlist
    @Query(() => [Wishlist], { name: "getWishlist" })
    @UseGuards(AuthGuard)
    get(
        @Context("user") reqUser: ReqUser
    ) {
        return this.wishlistService.get(reqUser);
    };

    //Check wishlist
    @Query(() => CheckWishlist, { name: "checkWishlist" })
    @UseGuards(AuthGuard)
    check(
        @Args("productId", { type: () => String }) productId: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.wishlistService.check(reqUser, productId);
    };

    //Add Wishlist
    @Mutation(() => SuccessInfo, { name: "addWishlist" })
    @UseGuards(AuthGuard)
    add(
        @Args("wishlistInput") wishlistInput: WishlistInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.wishlistService.add(wishlistInput, reqUser);
    }

    //Delete Wishlist
    @Mutation(() => SuccessInfo, { name: "deleteWishlist" })
    @UseGuards(AuthGuard)
    delete(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.wishlistService.delete(id);
    }
}