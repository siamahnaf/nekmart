import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class LoginInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    phoneOrEmail: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password: string;
}