import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { Flash } from "./model/flash.entity";

//Service and Resolver
import { FlashService } from "./flash.service";
import { FlashResolver } from "./flash.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Flash]),
        UserModule
    ],
    providers: [FlashService, FlashResolver],
    exports: [TypeOrmModule]
})

export class FlashModule { };