import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from "class-validator";

@InputType()
export class ReviewInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    product: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    seller: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    image: string[];

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    comment: string;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    rating: number;
}