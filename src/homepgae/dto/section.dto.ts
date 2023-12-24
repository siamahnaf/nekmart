import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

@InputType()
export class SectionInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    description: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    base: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    category: string;

    @Field(() => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    publish: boolean;
}