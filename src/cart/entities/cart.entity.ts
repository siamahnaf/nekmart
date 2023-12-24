import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Product } from "@/product/entities/product.entity";
import { Seller } from "@/seller/entities/seller.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class CartVariation {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    variant: string;
}

@ObjectType()
export class Cart {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Product, { nullable: false })
    productId: Product;
    @Field(() => Seller, { nullable: false })
    seller: Seller;
    @Field(() => User, { nullable: false })
    user: User;
    @Field(() => Float, { nullable: false })
    reserved: number;
    @Field(() => [CartVariation], { nullable: true })
    attributes: CartVariation[];
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}