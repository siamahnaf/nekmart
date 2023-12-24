import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CouponUser {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    code: string;
    @Field(() => String, { nullable: false })
    discount: string;
    @Field(() => String, { nullable: false })
    discountUnit: string;
    @Field(() => String, { nullable: false })
    points: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}