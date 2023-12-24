import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { ShippingService } from "./shipping.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetShippings, Shipping } from "./entities/shipping.entity";

//Dto
import { ShippingInput } from "./dto/shipping.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Guards
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class ShippingResolver {
    //Constructor
    constructor(
        private readonly shippingService: ShippingService
    ) { };

    //Get Shipping
    @Query(() => GetShippings, { name: "getShippings" })
    @UseGuards(AuthGuard)
    get(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.shippingService.get(searchInput);
    }

    //Get Single shipping
    @Query(() => Shipping, { name: "getShipping" })
    @UseGuards(AuthGuard)
    getSingle(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.shippingService.getSingle(id);
    }

    //Get Single shipping
    @Query(() => Shipping, { name: "getActiveShipping" })
    @UseGuards(AuthGuard)
    getActive() {
        return this.shippingService.getActive();
    };

    //Add Shipping
    @Mutation(() => SuccessInfo, { name: "addShipping" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("shippingInput") shippingInput: ShippingInput
    ) {
        return this.shippingService.add(shippingInput);
    }

    //Update Shipping
    @Mutation(() => SuccessInfo, { name: "updateShipping" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("shippingInput") shippingInput: ShippingInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.shippingService.update(shippingInput, id);
    }

    //Update shipping status
    @Mutation(() => SuccessInfo, { name: "setShippingAsActive" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    status(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.shippingService.status(id);
    };

    //Delete Shipping
    @Mutation(() => SuccessInfo, { name: "deleteShipping" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.shippingService.delete(id);
    }
}