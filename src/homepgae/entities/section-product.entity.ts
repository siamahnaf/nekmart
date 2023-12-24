import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Sections } from "./section.entity";
import { Product } from "@/product/entities/product.entity";

@ObjectType()
export class SectionProduct {
    @Field(() => Sections, { nullable: true })
    section: string;
    @Field(() => [Product], { nullable: true })
    products: Product[];
}