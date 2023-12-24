import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class ReplyInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    reviewId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    reply: string;
}
