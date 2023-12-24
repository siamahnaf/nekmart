import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";

@InputType()
export class PreorderInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    address: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    productImage: string[];

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    productUrl: string[];
}