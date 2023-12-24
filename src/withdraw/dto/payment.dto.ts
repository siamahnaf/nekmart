import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";

@InputType()
export class ReleasePaymentInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    seller: string;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    method: string;

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    incomesIds: string[];
}