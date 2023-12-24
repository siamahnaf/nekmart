import { ObjectType, Field } from "@nestjs/graphql";

//Meta
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Tag {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetTags {
    @Field(() => [Tag], { nullable: false })
    results: [Tag];
    @Field(() => Meta, { nullable: true })
    meta: Meta;
}