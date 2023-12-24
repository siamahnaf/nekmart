import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { MainCategory } from "./model/main-category.entity";
import { Category } from "./model/category.entity";
import { SubCategory } from "./model/sub-category.entity";

//Service and Resolver
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([MainCategory, Category, SubCategory]),
        UserModule
    ],
    providers: [CategoryService, CategoryResolver],
    exports: [TypeOrmModule]
})

export class CategoryModule { }