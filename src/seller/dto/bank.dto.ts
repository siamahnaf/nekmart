import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class BankInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    accNumber: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    routing: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    bankName: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    branch: string;
}