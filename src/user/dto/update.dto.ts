import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsEmail, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    name: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    avatar: string;
}