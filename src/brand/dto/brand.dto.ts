import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class BrandInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image: string;
}

