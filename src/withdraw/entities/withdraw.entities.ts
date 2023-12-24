import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Seller } from "@/seller/entities/seller.entity";
import { Meta } from "@/user/entities/meta.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class Withdraw {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Seller, { nullable: true })
    seller: Seller;
    @Field(() => Float, { nullable: false })
    amount: number;
    @Field(() => User, { nullable: true })
    releasedBy: User;
    @Field(() => String, { nullable: false })
    method: string;
    @Field(() => String, { nullable: false })
    status: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}



@ObjectType()
export class GetWithdraw {
    @Field(() => [Withdraw], { nullable: false })
    results: Withdraw[];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}