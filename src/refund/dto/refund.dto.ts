import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class RefundInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    refundableId: string;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    reason: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    description: string;
}