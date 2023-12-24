import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNumber, IsArray, IsOptional, IsBoolean } from "class-validator";

@InputType()
export class ProductSearchInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    search: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    seller: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    main_Category: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    category: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    sub_category: string[];

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    brand: string;

    @Field(() => [Float], { nullable: true })
    @IsArray()
    @IsOptional()
    price: number[];

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    visibility: boolean;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    approved: boolean;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    order: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    sortBy: string;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsOptional()
    limit: number;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    page: string;
}