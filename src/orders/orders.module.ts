import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { OrderProduct } from "./model/order-product.entity";
import { OrderSeller } from "./model/order-seller.entity";
import { Order } from "./model/orders.entity";

//Service and Resolver
import { OrderService } from "./orders.service";
import { OrderResolver } from "./orders.resolver";

//User
import { UserModule } from "src/user/user.module";
import { SellerModule } from "@/seller/seller.module";
import { AddressModule } from "@/address/address.module";
import { CartModule } from "@/cart/cart.module";
import { PointModule } from "@/points/points.module";
import { RefundModule } from "@/refund/refund.module";
import { WithdrawModule } from "@/withdraw/withdraw.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderProduct, OrderSeller, Order]),
        UserModule,
        SellerModule,
        AddressModule,
        CartModule,
        PointModule,
        RefundModule,
        WithdrawModule
    ],
    providers: [OrderService, OrderResolver],
    exports: [TypeOrmModule]
})

export class OrderModule { };