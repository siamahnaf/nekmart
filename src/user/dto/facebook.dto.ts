import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

//Input Types
@InputType()
export class FacebookInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    accessToken: string;
}