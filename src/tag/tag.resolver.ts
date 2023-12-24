import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { TagService } from "./tag.service";

//Dto
import { TagInput } from "./dto/tag.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Entity
import { SuccessInfo } from "@/user/entities/success.entity";
import { Tag, GetTags } from "./entities/tag.entity";

//Guards
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class TagResolver {
    //Constructor
    constructor(
        private readonly tagService: TagService
    ) { };

    //Get Tags
    @Query(() => GetTags, { name: "getTags" })
    getTags(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.tagService.getTags(searchInput);
    };

    //Get Tag
    @Query(() => Tag, { name: "getTag" })
    getTag(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.tagService.getTag(id);
    };

    //Add Tag
    @Mutation(() => SuccessInfo, { name: "addTag" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addTag(
        @Args("tagInput") tagInput: TagInput
    ) {
        return this.tagService.addTag(tagInput);
    };

    //Update Tag
    @Mutation(() => SuccessInfo, { name: "updateTag" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("id", { type: () => String }) id: string,
        @Args("tagInput") tagInput: TagInput
    ) {
        return this.tagService.update(id, tagInput);
    };

    //Delete Tag
    @Mutation(() => SuccessInfo, { name: "deleteTag" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.tagService.delete(id);
    };
}