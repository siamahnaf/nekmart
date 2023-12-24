import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Shipping {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    rateInsideDhaka: string;
    @Field(() => String, { nullable: false })
    rateOutsideDhaka: string;
    @Field(() => String, { nullable: false })
    rateInSavar: string;
    @Field(() => String, { nullable: false })
    estimateDelivery: string;
    @Field(() => Boolean, { nullable: false })
    active: boolean;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetShippings {
    @Field(() => [Shipping], { nullable: false })
    results: [Shipping];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}