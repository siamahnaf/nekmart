import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class ApplyInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    code: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    minPurchase: string;
}