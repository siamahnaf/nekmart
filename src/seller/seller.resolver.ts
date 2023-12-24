import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { SellerService } from "./seller.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetSellers, Seller } from "./entities/seller.entity";

//Dto
import { SellerInput } from "./dto/seller.dto";
import { BankInput } from "./dto/bank.dto";
import { SearchInput } from "@/user/dto/search.dto";
import { SellerVerifyInput } from "./dto/verify.dto";
import { UpdateSellerInput } from "./dto/update.dto";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";


@Resolver(Seller)
export class SellerResolver {
    //Constructor
    constructor(
        private readonly sellerService: SellerService
    ) { }

    //Get sellers for client
    @Query(() => GetSellers, { name: "getSellers" })
    gets(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.sellerService.gets(searchInput)
    };

    //Get sellers for admin
    @Query(() => GetSellers, { name: "getSellersByAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getsByAdmin(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.sellerService.getsByAdmin(searchInput)
    };

    //Get Single seller for client
    @Query(() => Seller, { name: "getSeller" })
    getByUser(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.sellerService.get(id);
    };

    //Get single seller for admin
    @Query(() => Seller, { name: "getSellerByAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getByAdmin(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.sellerService.getByAdmin(id);
    };

    //Get seller profile
    @Query(() => Seller, { name: "getSellerProfile" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getProfile(
        @Context("user") reqUser: ReqUser
    ) {
        return this.sellerService.getProfile(reqUser);
    };

    //Create seller
    @Mutation(() => SuccessInfo, { name: "createSeller" })
    create(
        @Args("sellerInput") sellerInput: SellerInput
    ) {
        return this.sellerService.create(sellerInput);
    };

    //Verify Seller Phone
    @Mutation(() => SuccessInfo, { name: "verifySellerPhone" })
    verifyPhone(
        @Args("sellerVerifyInput") sellerVerifyInput: SellerVerifyInput
    ) {
        return this.sellerService.verifyPhone(sellerVerifyInput);
    };

    //Update seller
    @Mutation(() => SuccessInfo, { name: "updateSeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("updateSellerInput") updateSellerInput: UpdateSellerInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.sellerService.update(id, updateSellerInput);
    };

    //Banned a seller
    @Mutation(() => SuccessInfo, { name: "banOrUnbannedSeller" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    ban(
        @Args("id", { type: () => String }) id: string,
        @Args("status", { type: () => Boolean }) status: boolean
    ) {
        return this.sellerService.ban(id, status);
    };

    //Seller verification
    @Mutation(() => SuccessInfo, { name: "verifySeller" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    verify(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.sellerService.verify(id)
    }

    //Add bank information
    @Mutation(() => SuccessInfo, { name: "addBankInformation" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    bank(
        @Args("bankInput") bankInput: BankInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.sellerService.bank(bankInput, reqUser);
    };
}