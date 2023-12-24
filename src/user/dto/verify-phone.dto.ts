import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class VerifyPhoneInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    otp: string;
}