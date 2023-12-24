import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class PreorderNoteInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    note: string;
}