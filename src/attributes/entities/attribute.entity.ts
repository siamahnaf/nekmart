import { ObjectType, Field } from "@nestjs/graphql";

//entities
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Values {
    @Field(() => String, { nullable: false })
    value: string;
    @Field(() => String, { nullable: true })
    meta: string;
}

@ObjectType()
export class Attribute {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => [Values], { nullable: true })
    values: [Values]
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetAttributes {
    @Field(() => [Attribute], { nullable: false })
    results: [Attribute];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}