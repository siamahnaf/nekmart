import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { FlashService } from "./flash.service";

//Dto
import { FlashInput } from "./dto/flash.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetFlashes, Flash } from "./entities/flash.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class FlashResolver {
    //Constructor
    constructor(
        private readonly flashService: FlashService
    ) { };

    //Get Flashes
    @Query(() => GetFlashes, { name: "getFlashes" })
    gets(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.flashService.gets(searchInput);
    };

    //Get Running Flashes
    @Query(() => GetFlashes, { name: "getRunningFlashes" })
    getRunning(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.flashService.getRunning(searchInput);
    };

    //Get Single Flash
    @Query(() => Flash, { name: "getFlash" })
    get(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.flashService.get(id);
    };

    //Add Flash sale
    @Mutation(() => SuccessInfo, { name: "addFlash" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("flashInput") flashInput: FlashInput
    ) {
        return this.flashService.add(flashInput);
    };

    //Update Flash sale
    @Mutation(() => SuccessInfo, { name: "updateFlash" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("flashInput") flashInput: FlashInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.flashService.update(flashInput, id);
    };

    //Delete Flash sale
    @Mutation(() => SuccessInfo, { name: "deleteFlash" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.flashService.delete(id);
    };
}