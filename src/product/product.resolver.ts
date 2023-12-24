import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { ProductService } from "./product.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetProducts, Product } from "./entities/product.entity";

//Dto
import { ProductInput } from "./dto/product.dto";
import { ProductSearchInput } from "./dto/product-search.dto";
import { SearchInput } from "@/user/dto/search.dto";
import { UpdateFlashProductInput } from "./dto/update-flash-product.dto";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { SellerGuard } from "@/auth/seller.guard";
import { ReqUser } from "@/auth/entities/user.types";

@Resolver(Product)
export class ProductResolver {
    //Constructor
    constructor(
        private readonly productService: ProductService
    ) { };

    //Get Products
    @Query(() => GetProducts, { name: "getProducts" })
    getProducts(
        @Args("productSearchInput") productSearchInput: ProductSearchInput
    ) {
        return this.productService.getProducts(productSearchInput);
    };

    //Get Single Product
    @Query(() => Product, { name: "getProduct" })
    getProduct(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.productService.getProduct(id)
    };

    //Get selling product
    @Query(() => [Product], { name: "getSellingProduct" })
    getSelling(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.productService.getSelling(id);
    };

    //Get Flash Product
    @Query(() => GetProducts, { name: "getFlashProduct" })
    getFlashProduct(
        @Args("searchInput") searchInput: SearchInput,
        @Args("flashId", { type: () => String }) flashId: string
    ) {
        return this.productService.getFlashProduct(flashId, searchInput);
    };

    //Get no flash product
    @Query(() => GetProducts, { name: "getNoFlashProduct" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard, SellerGuard)
    getNoFlashProduct(
        @Args("searchInput") searchInput: SearchInput,
        @Args("sellerId", { type: () => String }) sellerId: string
    ) {
        return this.productService.getNoFlashProduct(sellerId, searchInput);
    };

    //Get unapproved products
    @Query(() => GetProducts, { name: "getUnapprovedProduct" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUnapproved(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.productService.getUnapproved(searchInput);
    };

    //Get products by seller
    @Query(() => GetProducts, { name: "getProductBySeller" })
    getSellerProduct(
        @Args("searchInput") searchInput: SearchInput,
        @Args("id", { type: () => String }) id: string
    ) {
        return this.productService.sellerProduct(searchInput, id);
    };

    //Get own products for seller dashboard
    @Query(() => GetProducts, { name: "getOwnSellerProducts" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard, SellerGuard)
    getOwnSellerProducts(
        @Args("searchInput") searchInput: SearchInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.productService.getOwnSellerProducts(reqUser, searchInput);
    };

    //Get own single product for seller
    @Query(() => Product, { name: "getOwnSellerSingleProduct" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard, SellerGuard)
    getOwnSingle(
        @Args("id", { type: () => String }) id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.productService.getOwnSingle(id, reqUser)
    };

    //Add Products
    @Mutation(() => SuccessInfo, { name: "addProduct" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard, SellerGuard)
    add(
        @Args("productInput") productInput: ProductInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.productService.add(productInput, reqUser);
    };

    //Update Products
    @Mutation(() => SuccessInfo, { name: "updateProduct" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard, SellerGuard)
    update(
        @Args("productInput") productInput: ProductInput,
        @Args("id", { type: () => String }) id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.productService.update(id, productInput, reqUser);
    };

    //Update products with flashes
    @Mutation(() => SuccessInfo, { name: "updateFlashProduct" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard, SellerGuard)
    updateFlash(
        @Args("updateFlashProductInput") updateFlashProductInput: UpdateFlashProductInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.productService.updateFlash(updateFlashProductInput, reqUser);
    };

    //Change Product Visibility
    @Mutation(() => SuccessInfo, { name: "changeProductVisibility" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    change(
        @Args("id", { type: () => String }) id: string,
        @Args("visibility", { type: () => Boolean }) visibility: boolean
    ) {
        return this.productService.change(id, visibility);
    };

    //Approved products
    @Mutation(() => SuccessInfo, { name: "approvedProduct" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    approved(
        @Args("id", { type: () => String }) id: string,
        @Args("approved", { type: () => Boolean }) approved: boolean
    ) {
        return this.productService.approved(id, approved)
    }

    //Delete Products
    @Mutation(() => SuccessInfo, { name: "deleteProduct" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String }) id: string,
        @Context("user") reqUser: ReqUser
    ) {
        return this.productService.delete(id, reqUser);
    }
}