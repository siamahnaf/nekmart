import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { BannerOne } from "./model/banner-one.entity";
import { BannerTwo } from "./model/banner-two.entity";
import { Section } from "./model/section.entity";

//Service and Resolver
import { HomeService } from "./home.service";
import { HomeResolver } from "./home.resolver";

//Module
import { UserModule } from "src/user/user.module";
import { ProductModule } from "@/product/product.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([BannerOne, BannerTwo, Section]),
        UserModule,
        ProductModule
    ],
    providers: [HomeService, HomeResolver]
})

export class HomeModule { }