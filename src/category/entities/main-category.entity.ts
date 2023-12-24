import { ObjectType, Field } from "@nestjs/graphql";

//Entity
import { Category } from "./category.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class MainCategory {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => [Category], { nullable: true })
    category: Category[];
    @Field(() => String, { nullable: true })
    image: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetMainCategories {
    @Field(() => [MainCategory], { nullable: false })
    results: [MainCategory];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}