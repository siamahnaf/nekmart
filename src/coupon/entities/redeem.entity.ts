import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class RedeemInfo {
    @Field(() => Boolean, { nullable: false })
    success: boolean;
    @Field(() => String, { nullable: false })
    code: string;
    @Field(() => String, { nullable: false })
    message: string;
}