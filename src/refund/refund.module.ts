import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Refund } from "./model/refund.entity";
import { Refundable } from "./model/refundable.entity";

//Service and Resolver 
import { RefundService } from "./refund.service";
import { RefundResolver } from "./refund.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Refund, Refundable]),
        UserModule
    ],
    providers: [RefundService, RefundResolver],
    exports: [TypeOrmModule]
})

export class RefundModule { };