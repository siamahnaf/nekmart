import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";
import { Address } from "@/address/entities/address.entity";
import { OrderSeller } from "./order-seller.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class PaymentInfo {
    @Field(() => String, { nullable: true })
    paymentMethod: string;
    @Field(() => String, { nullable: true })
    paymentId: string;
    @Field(() => String, { nullable: true })
    provider: string;
}

@ObjectType()
export class Order {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    orderId: string;
    @Field(() => [OrderSeller], { nullable: true })
    sellers: OrderSeller[];
    @Field(() => Float, { nullable: false })
    couponDiscount: number;
    @Field(() => Float, { nullable: false })
    total: number;
    @Field(() => Float, { nullable: false })
    subtotal: number;
    @Field(() => Float, { nullable: false })
    shippingFees: number;
    @Field(() => Float, { nullable: false })
    shippingCount: number;
    @Field(() => String, { nullable: false })
    estimateDelivery: string;
    @Field(() => PaymentInfo, { nullable: true })
    payment: PaymentInfo;
    @Field(() => Address, { nullable: true })
    shippingAddress: Address;
    @Field(() => Address, { nullable: true })
    billingAddress: Address;
    @Field(() => String, { nullable: true })
    note: string;
    @Field(() => User, { nullable: true })
    user: User;
    @Field(() => Boolean, { nullable: false })
    paymentStatus: boolean;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}


@ObjectType()
export class GetOrders {
    @Field(() => [Order], { nullable: false })
    results: [Order];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}