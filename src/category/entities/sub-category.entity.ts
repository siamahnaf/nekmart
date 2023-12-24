import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Category } from "./category.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class SubCategory {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => Category, { nullable: true })
    category: Category;
    @Field(() => String, { nullable: true })
    image: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetSubCategories {
    @Field(() => [SubCategory], { nullable: false })
    results: [SubCategory];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}