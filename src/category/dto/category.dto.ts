import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CategoryInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    main_category: string;
}