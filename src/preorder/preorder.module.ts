import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entity
import { Preorder } from "./model/preorder.schema";

//Service and Resolver
import { PreorderService } from "./preorder.service";
import { PreorderResolver } from "./preorder.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Preorder]),
        UserModule
    ],
    providers: [PreorderService, PreorderResolver]
})

export class PreorderModule { };