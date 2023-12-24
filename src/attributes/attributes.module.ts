import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entity
import { Attribute } from "./model/attributes.entity";

//Service and Resolver
import { AttributeService } from "./attributes.service";
import { AttributeResolver } from "./attributes.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Attribute]),
        UserModule
    ],
    providers: [AttributeService, AttributeResolver],
    exports: [TypeOrmModule]
})

export class AttributeModule { };