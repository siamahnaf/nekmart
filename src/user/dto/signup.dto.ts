import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

@InputType()
export class SignupInput {
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
    @IsEmail()
    @IsOptional()
    email: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password: string;
}