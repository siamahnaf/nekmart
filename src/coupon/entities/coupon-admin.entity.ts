import { ObjectType, Field } from "@nestjs/graphql";

//Orm entity
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class CouponAdmin {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    code: string;
    @Field(() => String, { nullable: false })
    discount: string;
    @Field(() => String, { nullable: false })
    discountUnit: string;
    @Field(() => String, { nullable: false })
    minimumPurchase: string;
    @Field(() => Date, { nullable: false })
    expires: Date;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetCoupons {
    @Field(() => [CouponAdmin], { nullable: false })
    results: [CouponAdmin];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}