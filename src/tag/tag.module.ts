import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Tag } from "./model/tag.entity";

//Service and Resolver
import { TagService } from "./tag.service";
import { TagResolver } from "./tag.resolver";

//Modules
import { UserModule } from "src/user/user.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Tag]),
        UserModule
    ],
    providers: [TagService, TagResolver],
    exports: [TypeOrmModule]
})

export class TagModule { };