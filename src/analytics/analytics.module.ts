import { Module } from "@nestjs/common";

//Service and Resolver
import { AnalyticsService } from "./analytics.service";
import { AnalyticsResolver } from "./analytics.resolver";

//Modules
import { UserModule } from "@/user/user.module";
import { CartModule } from "@/cart/cart.module";
import { WishlistModule } from "@/wishlist/wishlist.module";
import { OrderModule } from "@/orders/orders.module";
import { AddressModule } from "@/address/address.module";

@Module({
    imports: [
        UserModule,
        CartModule,
        WishlistModule,
        OrderModule,
        AddressModule
    ],
    providers: [AnalyticsService, AnalyticsResolver]
})

export class AnalyticsModule { }