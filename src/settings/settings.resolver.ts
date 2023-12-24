import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { SettingService } from "./settings.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Settings } from "./entities/setting.entity";

//Dto
import { SettingsInput } from "./dto/settings.dto";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class SettingResolver {
    //Constructor
    constructor(
        private readonly settingService: SettingService
    ) { };

    //Get Site settings
    @Query(() => Settings, { name: "getSiteSettings" })
    get() {
        return this.settingService.get();
    }

    //Save or Add Site setting
    @Mutation(() => SuccessInfo, { name: "addSettings" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    site(
        @Args("siteInput") siteInput: SettingsInput
    ) {
        return this.settingService.site(siteInput);
    }
}