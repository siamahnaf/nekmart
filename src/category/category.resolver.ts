import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";

//Service
import { CategoryService } from "./category.service";

//Entity
import { SuccessInfo } from "@/user/entities/success.entity";
import { MainCategory, GetMainCategories } from "./entities/main-category.entity";
import { Category, GetCategories } from "./entities/category.entity";
import { SubCategory, GetSubCategories } from "./entities/sub-category.entity";

//Dto
import { MainCategoryInput } from "./dto/main-category.dto";
import { CategoryInput } from "./dto/category.dto";
import { SubCategoryInput } from "./dto/sub-category.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";


@Resolver()
export class CategoryResolver {
    //Constructor
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    //---------------------------------Main Category----------------------------//
    //Get All main Category
    @Query(() => GetMainCategories, { name: "getMainCategories" })
    mainCategories(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.categoryService.mainCategories(searchInput)
    }

    //Get Single main Category
    @Query(() => MainCategory, { name: "getMainCategory" })
    mainCategory(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.mainCategory(id);
    }

    //Add Main Category
    @Mutation(() => SuccessInfo, { name: "addMainCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addMain(
        @Args("mainCategoryInput") mainCategoryInput: MainCategoryInput
    ) {
        return this.categoryService.addMain(mainCategoryInput);
    }

    //Update main category
    @Mutation(() => SuccessInfo, { name: "updateMainCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateMain(
        @Args("mainCategoryInput") mainCategoryInput: MainCategoryInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.updateMain(mainCategoryInput, id)
    }

    //Delete main category
    @Mutation(() => SuccessInfo, { name: "deleteMainCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteMain(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.deleteMain(id)
    }

    //-------------------------------------Category-------------------------------//
    //Get All Category
    @Query(() => GetCategories, { name: "getCategories" })
    categories(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.categoryService.categories(searchInput);
    };

    //Get Single Category
    @Query(() => Category, { name: "getCategory" })
    category(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.category(id);
    }

    //Add Category
    @Mutation(() => SuccessInfo, { name: "addCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addCategory(
        @Args("categoryInput") categoryInput: CategoryInput
    ) {
        return this.categoryService.addCategory(categoryInput);
    }

    //Update Category
    @Mutation(() => SuccessInfo, { name: "updateCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateCategory(
        @Args("categoryInput") categoryInput: CategoryInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.updateCategory(categoryInput, id);
    }

    //Delete Category
    @Mutation(() => SuccessInfo, { name: "deleteCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteCategory(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.deleteCategory(id);
    }

    //-----------------------------------Sub-Category--------------------------//
    //Get all sub category
    @Query(() => GetSubCategories, { name: "getSubCategories" })
    getSubs(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.categoryService.getSubs(searchInput);
    }

    //Get single sub category
    @Query(() => SubCategory, { name: "getSubCategory" })
    getSub(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.getSub(id);
    };

    //Create sub category
    @Mutation(() => SuccessInfo, { name: "addSubCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    createSub(
        @Args("subCategoryInput") subCategoryInput: SubCategoryInput
    ) {
        return this.categoryService.createSub(subCategoryInput);
    }

    //Update sub category
    @Mutation(() => SuccessInfo, { name: "updateSubCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateSub(
        @Args("id", { type: () => String }) id: string,
        @Args("subCategoryInput") subCategoryInput: SubCategoryInput
    ) {
        return this.categoryService.updateSub(id, subCategoryInput);
    }

    //Delete sub category
    @Mutation(() => SuccessInfo, { name: "deleteSubCategory" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteSub(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.categoryService.deleteSub(id)
    };
}