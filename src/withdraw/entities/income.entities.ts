import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Seller } from "@/seller/entities/seller.entity";
import { Meta } from "@/user/entities/meta.entity";
import { Order } from "@/orders/entities/order.entity";

@ObjectType()
export class Income {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => Seller, { nullable: true })
    seller: Seller;
    @Field(() => Order, { nullable: true })
    orderId: Order;
    @Field(() => Float, { nullable: true })
    income: number;
    @Field(() => Boolean, { nullable: true })
    paySuccess: boolean;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetIncomes {
    @Field(() => [Income], { nullable: false })
    results: Income[];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}
