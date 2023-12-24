import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { AddressService } from "./address.service";

//Dto
import { AddressInput } from "./dto/address.dto";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Address } from "./entities/address.entity";

//Guard
import { AuthGuard } from "@/auth/auth.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Resolver()
export class AddressResolver {
    //Constructor
    constructor(
        private readonly addressService: AddressService
    ) { };

    //Get Address
    @Query(() => [Address], { name: "getAddress" })
    @UseGuards(AuthGuard)
    get(
        @Context("user") reqUser: ReqUser
    ) {
        return this.addressService.get(reqUser);
    };

    //Add Address
    @Mutation(() => SuccessInfo, { name: "addAddress" })
    @UseGuards(AuthGuard)
    add(
        @Args("addressInput") addressInput: AddressInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.addressService.add(addressInput, reqUser);
    };

    //Update Address 
    @Mutation(() => SuccessInfo, { name: "updateAddress" })
    @UseGuards(AuthGuard)
    update(
        @Args("addressInput") addressInput: AddressInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.addressService.update(addressInput, id);
    };

    // Mark address as Default
    @Mutation(() => SuccessInfo, { name: "markAddDefault" })
    @UseGuards(AuthGuard)
    mark(
        @Args("id", { type: () => String }) id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.addressService.mark(id, reqUser)
    };

    //Delete Address 
    @Mutation(() => SuccessInfo, { name: "deleteAddress" })
    @UseGuards(AuthGuard)
    delete(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.addressService.delete(id);
    }
}