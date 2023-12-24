import { ObjectType, Field } from "@nestjs/graphql";

//Meta
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Preorder {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    firstName: string;
    @Field(() => String, { nullable: false })
    lastName: string;
    @Field(() => String, { nullable: false })
    phone: string;
    @Field(() => String, { nullable: false })
    address: string;
    @Field(() => String, { nullable: false })
    email: string;
    @Field(() => [String], { nullable: true })
    productImage: string[];
    @Field(() => [String], { nullable: false })
    productUrl: string[];
    @Field(() => String, { nullable: true })
    note: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetPreorder {
    @Field(() => [Preorder], { nullable: false })
    results: [Preorder];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}