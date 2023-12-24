import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

@InputType()
export class CartVariationInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    id: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    variant: string;
}

@InputType()
export class CartInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    seller: string;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    reserved: number;

    @Field(() => [CartVariationInput], { nullable: true })
    @IsOptional()
    attributes: CartVariationInput[];
}