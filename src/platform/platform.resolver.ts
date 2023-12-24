import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { PlatformService } from "./platform.service";

//Dto
import { PlatformInput } from "./dto/platform.dto";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Platform } from "./entities/platform.entity";

//Guards
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class PlatformResolver {
    //Constructor
    constructor(
        private readonly platformService: PlatformService
    ) { }

    //Get platform
    @Query(() => Platform, { name: "getPlatform" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    get() {
        return this.platformService.get();
    }

    //Add platform charge
    @Mutation(() => SuccessInfo, { name: "addPlatform" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("platformInput") platformInput: PlatformInput
    ) {
        return this.platformService.add(platformInput);
    }
}