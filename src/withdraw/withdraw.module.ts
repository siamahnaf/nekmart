import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Income } from "./model/income.entity";
import { Withdraw } from "./model/withdraw.entity";

//Service and Resolver
import { WithdrawService } from "./withdraw.service";
import { WithdrawResolver } from "./withdraw.resolver";

//Module
import { UserModule } from "src/user/user.module";
import { SellerModule } from "@/seller/seller.module";
import { PlatformModule } from "src/platform/platform.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Income, Withdraw]),
        UserModule,
        SellerModule,
        PlatformModule
    ],
    providers: [WithdrawService, WithdrawResolver],
    exports: [TypeOrmModule]
})

export class WithdrawModule { }