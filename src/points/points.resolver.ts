import { Resolver, ResolveField, Parent, Query, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { PointService } from "./points.service";

//Entities
import { Points } from "./entities/points.entity";
import { UserPoints } from "./entities/user-points.entity";

//Guards
import { AuthGuard } from "@/auth/auth.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Resolver()
export class PointResolver {
    //Constructor
    constructor(
        private readonly pointService: PointService
    ) { };

    //Get points
    @Query(() => [Points], { name: "getPoints" })
    @UseGuards(AuthGuard)
    get(
        @Context("user") reqUser: ReqUser
    ) {
        return this.pointService.get(reqUser);
    }

    //Get User Points
    @Query(() => UserPoints, { name: "getUserPoints" })
    @UseGuards(AuthGuard)
    getPoints(
        @Context("user") reqUser: ReqUser
    ) {
        return this.pointService.getPoints(reqUser);
    }

}