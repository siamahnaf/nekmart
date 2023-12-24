import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { MainCategory } from "./main-category.entity";
import { SubCategory } from "./sub-category.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Category {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: true })
    image: string;
    @Field(() => MainCategory, { nullable: true })
    main_category: MainCategory;
    @Field(() => [SubCategory], { nullable: true })
    sub_category: SubCategory[];
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetCategories {
    @Field(() => [Category], { nullable: false })
    results: [Category];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}