import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Banner {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    url: string;
    @Field(() => String, { nullable: false })
    path: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}