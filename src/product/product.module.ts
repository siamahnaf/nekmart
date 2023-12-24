import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";

//Orm entity
import { Product } from "./model/product.entity";
import { ProductAttribute } from "./model/attribute.entity";
import { Meta } from "./model/meta.entity";

//Service and Resolvers 
import { ProductService } from "./product.service";
import { ProductResolver } from "./product.resolver";

//Module
import { UserModule } from "src/user/user.module";
import { SellerModule } from "@/seller/seller.module";
import { AttributeModule } from "@/attributes/attributes.module";
import { CategoryModule } from "@/category/category.module";
import { TagModule } from "@/tag/tag.module";
import { FlashModule } from "@/flash/flash.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductAttribute, Meta]),
        ScheduleModule.forRoot(),
        UserModule,
        SellerModule,
        AttributeModule,
        CategoryModule,
        TagModule,
        FlashModule
    ],
    providers: [ProductService, ProductResolver],
    exports: [TypeOrmModule]
})

export class ProductModule { };