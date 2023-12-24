import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { Brand } from "./model/brand.entity";

//Service and Resolver
import { BrandService } from "./brand.service";
import { BrandResolver } from "./brand.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Brand]),
        UserModule
    ],
    providers: [BrandService, BrandResolver]
})

export class BrandModule { }