import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Entity
import { Cart } from "./model/cart.entity";

//Service And Resolver
import { CartService } from "./cart.service";
import { CartResolver } from "./cart.resolver";

//Modules
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart]),
        UserModule
    ],
    providers: [CartService, CartResolver],
    exports: [TypeOrmModule]
})

export class CartModule { };