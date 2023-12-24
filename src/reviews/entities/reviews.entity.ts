import { ObjectType, Field, Float } from "@nestjs/graphql";
import { Meta } from "@/user/entities/meta.entity";

//Entities
import { User } from "@/user/entities/user.entity";
import { Product } from "@/product/entities/product.entity";
import { Seller } from "@/seller/entities/seller.entity";

@ObjectType()
export class Review {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => User, { nullable: true })
    user: User;
    @Field(() => Seller, { nullable: true })
    seller: Seller;
    @Field(() => Product, { nullable: true })
    product: Product;
    @Field(() => [String], { nullable: true })
    image: string[]
    @Field(() => String, { nullable: false })
    comment: string;
    @Field(() => String, { nullable: true })
    reply: string;
    @Field(() => Float, { nullable: false })
    rating: number;
    @Field(() => Boolean, { nullable: false })
    publish: boolean;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetReviews {
    @Field(() => [Review], { nullable: false })
    results: Review[];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}