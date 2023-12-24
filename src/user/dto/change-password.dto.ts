import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class ChangePasswordInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}