import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { MainCategory } from "@/category/entities/main-category.entity";

@ObjectType()
export class Sections {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    description: string;
    @Field(() => Boolean, { nullable: false })
    publish: boolean;
    @Field(() => String, { nullable: false })
    base: string;
    @Field(() => MainCategory, { nullable: true })
    category: MainCategory;
    @Field(() => Date, { nullable: false })
    createdAt: Date;
    @Field(() => Date, { nullable: false })
    updatedAt: Date;
}