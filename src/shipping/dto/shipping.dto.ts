import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class ShippingInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    rateInsideDhaka: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    rateOutsideDhaka: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    rateInSavar: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    estimateDelivery: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;
}