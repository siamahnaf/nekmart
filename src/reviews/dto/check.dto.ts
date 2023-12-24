import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class CheckReviewInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    product: string
}