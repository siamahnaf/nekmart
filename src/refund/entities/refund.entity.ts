import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";
import { User } from "@/user/entities/user.entity";
import { Refundable } from "./refundable.entity";

@ObjectType()
export class Refund {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Refundable, { nullable: true })
    refundableId: Refundable;
    @Field(() => User, { nullable: true })
    user: User;
    @Field(() => Float, { nullable: true })
    quantity: number;
    @Field(() => String, { nullable: false })
    reason: string;
    @Field(() => String, { nullable: false })
    description: string;
    @Field(() => String, { nullable: false })
    status: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetRefund {
    @Field(() => [Refund], { nullable: false })
    results: Refund[];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}