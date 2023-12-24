import { InputType, Field, Int } from "@nestjs/graphql";
import { IsOptional, IsString, IsEnum, IsNumber } from "class-validator";

@InputType()
export class SearchInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    search: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @IsEnum(["ASC", "DESC"])
    orderBy: "ASC" | "DESC";

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    limit: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    page: number;
}