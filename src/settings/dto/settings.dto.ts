import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsOptional, IsArray } from "class-validator";

@InputType()
export class SettingsInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    logo: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    icon: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    siteTitle: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    slogan: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaTitle: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaDescription: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    metaTag: string[];

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    siteUrl: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    ogTitle: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    ogDescription: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    ogImage: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    email: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    phone: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    corporateOffice: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    headOffice: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    facebook: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    instagram: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    youtube: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    twitter: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    linkedIn: string;
}