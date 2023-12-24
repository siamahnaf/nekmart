import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { Shipping } from "./model/shipping.entity";

//Service and Resolver 
import { ShippingService } from "./shipping.service";
import { ShippingResolver } from "./shipping.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Shipping]),
        UserModule
    ],
    providers: [ShippingService, ShippingResolver]
})

export class ShippingModule { };