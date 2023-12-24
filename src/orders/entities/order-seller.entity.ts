import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Seller } from "@/seller/entities/seller.entity";
import { Product } from "@/product/entities/product.entity";
import { Order } from "./order.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class OrderVariation {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    variant: string;
}

@ObjectType()
export class OrderProduct {
    @Field(() => Product, { nullable: true })
    productId: Product;
    @Field(() => Float, { nullable: false })
    quantity: number;
    @Field(() => [OrderVariation], { nullable: true })
    variation: OrderVariation[];
    @Field(() => Float, { nullable: false })
    tax: number;
    @Field(() => Float, { nullable: false })
    amount: number;
}


@ObjectType()
export class OrderSeller {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Seller, { nullable: true })
    sellerId: Seller;
    @Field(() => [OrderProduct], { nullable: true })
    products: OrderProduct[];
    @Field(() => Order, { nullable: true })
    order: Order;
    @Field(() => Float, { nullable: false })
    price: number;
    @Field(() => String, { nullable: false })
    status: string;
    @Field(() => String, { nullable: false })
    cancelBy: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetOrderSeller {
    @Field(() => [OrderSeller], { nullable: false })
    results: [OrderSeller];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}