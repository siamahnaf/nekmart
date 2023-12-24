import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Platform {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    charge: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}