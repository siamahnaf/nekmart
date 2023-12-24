import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsDate } from "class-validator";

@InputType()
export class FlashInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    thumb: string;


    @Field(() => Date, { nullable: false })
    @IsDate()
    @IsNotEmpty()
    start: Date;

    @Field(() => Date, { nullable: false })
    @IsDate()
    @IsNotEmpty()
    expires: Date;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discount: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discountUnit: string;
}