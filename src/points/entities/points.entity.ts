import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Order } from "@/orders/entities/order.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class Points {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Float, { nullable: false })
    points: number;
    @Field(() => Order, { nullable: true })
    order: Order;
    @Field(() => User, { nullable: true })
    user: User;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}