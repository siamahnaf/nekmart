import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpModule } from "@nestjs/axios";

//Orm entity
import { Seller } from "./model/seller.entity";
import { Bank } from "./model/bank.entity";

//Service and Resolver
import { SellerService } from "./seller.service";
import { SellerResolver } from "./seller.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Seller, Bank]),
        UserModule,
        HttpModule
    ],
    providers: [SellerService, SellerResolver],
    exports: [TypeOrmModule]
})

export class SellerModule { }