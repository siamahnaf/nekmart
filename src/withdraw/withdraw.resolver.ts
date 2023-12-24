import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { WithdrawService } from "./withdraw.service";

//Dto
import { ReleasePaymentInput } from "./dto/payment.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Withdraw, GetWithdraw } from "./entities/withdraw.entities";
import { GetIncomes } from "./entities/income.entities";
import { IncomeStatics } from "./entities/income-statics.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";


@Resolver()
export class WithdrawResolver {
    //Constructor
    constructor(
        private readonly withdrawService: WithdrawService
    ) { }

    //Get withdrawal from admin
    @Query(() => GetWithdraw, { name: "getWithdrawalByAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getByAdmin(
        @Args("sellerId", { type: () => String }) sellerId: string,
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.withdrawService.getByAdmin(sellerId, searchInput);
    };

    //Get Withdraw from seller
    @Query(() => GetWithdraw, { name: "getWithdrawalBySeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getBySeller(
        @Args("searchInput") searchInput: SearchInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.withdrawService.getBySeller(searchInput, reqUser);
    };

    //Get Income History
    @Query(() => GetIncomes, { name: "getIncomeHistory" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getIncome(
        @Args("searchInput") searchInput: SearchInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.withdrawService.getIncome(searchInput, reqUser);
    };

    //Get Income Statics
    @Query(() => IncomeStatics, { name: "getIncomeStatics" })
    @Roles(Role.SELLER, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getStatics(
        @Args("sellerId", { type: () => String }) sellerId: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.withdrawService.getStatics(sellerId, reqUser);
    };

    //Get processing payment from seller
    @Query(() => [Withdraw], { name: "getProcessingWithdraw" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getProcessing(
        @Context("user") reqUser: ReqUser
    ) {
        return this.withdrawService.process(reqUser);
    }

    //Release payment
    @Mutation(() => SuccessInfo, { name: "releasePayment" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    release(
        @Args("paymentInput") paymentInput: ReleasePaymentInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.withdrawService.release(paymentInput, reqUser);
    }

    //Confirm payment by seller
    @Mutation(() => SuccessInfo, { name: "confirmPayment" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    confirm(
        @Args("withdrawId", { type: () => String }) withdrawId: string
    ) {
        return this.withdrawService.confirm(withdrawId);
    }
}