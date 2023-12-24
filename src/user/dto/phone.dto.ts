import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class PhoneInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone: string;
}