import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Address } from "./model/address.entity";

//Service and Resolver
import { AddressService } from "./address.service";
import { AddressResolver } from "./address.resolver";

//Module
import { UserModule } from "@/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Address]),
        UserModule
    ],
    providers: [AddressService, AddressResolver],
    exports: [TypeOrmModule]
})

export class AddressModule { };