import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ApplyInfo {
    @Field(() => Boolean, { nullable: false })
    success: boolean;
    @Field(() => String, { nullable: false })
    message: string;
    @Field(() => String, { nullable: false })
    discount: string;
}