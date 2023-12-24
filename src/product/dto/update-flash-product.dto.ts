import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsArray } from "class-validator";

@InputType()
export class UpdateFlashProductInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    flashId: string;

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    productIds: string[];
}