import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Wishlist } from "./model/wishlist.entity";

//Service and Resolver
import { WishlistService } from "./wishlist.service";
import { WishlistResolver } from "./wishlist.resolver";

//User
import { UserModule } from "@/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Wishlist]),
        UserModule
    ],
    providers: [WishlistService, WishlistResolver],
    exports: [TypeOrmModule]
})

export class WishlistModule { };