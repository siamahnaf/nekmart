import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class SellerVerifyInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    shopName: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    otp: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    logo: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    banner: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    address: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaTitle: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaDescription: string;
}