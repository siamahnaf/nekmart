import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Meta {
    @Field(() => Int, { nullable: true })
    itemCount: number;
    @Field(() => Int, { nullable: true })
    totalItems: number;
    @Field(() => Int, { nullable: true })
    itemsPerPage: number;
    @Field(() => Int, { nullable: true })
    totalPages: number;
    @Field(() => Int, { nullable: true })
    currentPage: number;
}