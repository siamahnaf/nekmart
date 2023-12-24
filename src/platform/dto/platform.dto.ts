import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class PlatformInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    charge: string;
}