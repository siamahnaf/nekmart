import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { CartService } from "./cart.service";

//Dto
import { CartInput } from "./dto/cart.dto";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Cart } from "./entities/cart.entity";

//Guard
import { AuthGuard } from "@/auth/auth.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Resolver(Cart)
export class CartResolver {
    //Constructor
    constructor(
        private readonly cartService: CartService
    ) { };

    //Get Carts
    @Query(() => [Cart], { name: "getCarts" })
    @UseGuards(AuthGuard)
    get(
        @Context("user") reqUser: ReqUser
    ) {
        return this.cartService.get(reqUser);
    };

    //Add Cart
    @Mutation(() => SuccessInfo, { name: "addCart" })
    @UseGuards(AuthGuard)
    add(
        @Args("cartInput") cartInput: CartInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.cartService.add(cartInput, reqUser);
    };

    //Increase cart quantity
    @Mutation(() => SuccessInfo, { name: "increaseCart" })
    @UseGuards(AuthGuard)
    increase(
        @Args("id", { type: () => String }) id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.cartService.increase(id, reqUser);
    };

    //Decrease cart quantity
    @Mutation(() => SuccessInfo, { name: "decreaseCart" })
    @UseGuards(AuthGuard)
    decrease(
        @Args("id", { type: () => String }) id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.cartService.decrease(id, reqUser);
    };

    //Delete Cart 
    @Mutation(() => SuccessInfo, { name: "deleteCart" })
    @UseGuards(AuthGuard)
    delete(
        @Args("id", { type: () => String }) id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.cartService.delete(id, reqUser);
    };
}