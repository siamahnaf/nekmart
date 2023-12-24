import { Field, ObjectType, Float } from "@nestjs/graphql";

//Address
import { Address } from "@/address/entities/address.entity";

@ObjectType()
export class UserAnalytics {
    @Field(() => Float, { nullable: true })
    totalCart: number;
    @Field(() => Float, { nullable: true })
    totalWishlist: number;
    @Field(() => Float, { nullable: true })
    totalOrder: number;
    @Field(() => Address, { nullable: true })
    defaultAddress: Address;
}