import { Resolver, Query, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { AnalyticsService } from "./analytics.service";

//Entity
import { UserAnalytics } from "./entities/analytics-user.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Resolver()
export class AnalyticsResolver {
    //Constructor
    constructor(
        private readonly analyticsService: AnalyticsService
    ) { }

    //Get Analytics for user dashboard
    @Query(() => UserAnalytics, { name: "getAnalyticsByUser" })
    @UseGuards(AuthGuard)
    user(
        @Context("user") reqUser: ReqUser
    ) {
        return this.analyticsService.user(reqUser);
    }
}