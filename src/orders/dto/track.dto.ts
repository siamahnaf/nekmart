import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class TrackInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    trackId: string;
}