import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { PreorderService } from "./preorder.service";

//Dto
import { PreorderInput } from "./dto/preorder.dto";
import { PreorderNoteInput } from "./dto/update.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Entities
import { SuccessInfo } from "src/user/entities/success.entity";
import { GetPreorder } from "./entities/preorder.entity";

//Guard
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

@Resolver()
export class PreorderResolver {
    //Constructor
    constructor(
        private readonly preorderService: PreorderService
    ) { };

    //Get preorder
    @Query(() => GetPreorder, { name: "getPreorder" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    get(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.preorderService.get(searchInput);
    }

    //Add Preorder
    @Mutation(() => SuccessInfo, { name: "addPreorder" })
    add(
        @Args("preorderInput") preorderInput: PreorderInput
    ) {
        return this.preorderService.add(preorderInput);
    }

    //Update preorder Note
    @Mutation(() => SuccessInfo, { name: "updatePreorderNote" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("preorderNoteInput") preorderNoteInput: PreorderNoteInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.preorderService.update(preorderNoteInput, id);
    }

    //Delete Preorder
    @Mutation(() => SuccessInfo, { name: "deletePreorder" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.preorderService.delete(id);
    }
}