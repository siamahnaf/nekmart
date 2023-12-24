import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { Platform } from "./model/platform.entity";

//Service and Resolver
import { PlatformService } from "./platform.service";
import { PlatformResolver } from "./platform.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Platform]),
        UserModule
    ],
    providers: [PlatformService, PlatformResolver],
    exports: [TypeOrmModule]
})

export class PlatformModule { };