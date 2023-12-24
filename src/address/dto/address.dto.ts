import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class AddressInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    gender: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    address: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    country: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    city: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    area: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    postal: string;
}