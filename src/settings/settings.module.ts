import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Settings } from "./model/setting.entity";

//Service and Resolver
import { SettingService } from "./settings.service";
import { SettingResolver } from "./settings.resolver";

//Module
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Settings]),
        UserModule
    ],
    providers: [SettingService, SettingResolver]
})

export class SettingModule { };