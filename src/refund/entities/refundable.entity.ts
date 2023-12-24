import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { OrderVariation } from "@/orders/entities/order-seller.entity";
import { Order } from "@/orders/entities/order.entity";
import { Product } from "@/product/entities/product.entity";
import { User } from "@/user/entities/user.entity";
import { Seller } from "@/seller/entities/seller.entity";
import { Address } from "@/address/entities/address.entity";

@ObjectType()
export class Refundable {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => User, { nullable: true })
    user: User;
    @Field(() => Product, { nullable: true })
    productId: Product;
    @Field(() => Order, { nullable: true })
    order: Order;
    @Field(() => Float, { nullable: true })
    quantity: number;
    @Field(() => [OrderVariation], { nullable: true })
    variation: OrderVariation[];
    @Field(() => Seller, { nullable: true })
    seller: Seller;
    @Field(() => Address, { nullable: true })
    address: Address;
    @Field(() => Float, { nullable: false })
    couponDiscount: number;
    @Field(() => Float, { nullable: false })
    amount: number;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}