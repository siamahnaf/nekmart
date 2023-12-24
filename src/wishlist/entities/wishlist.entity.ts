import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";
import { Product } from "@/product/entities/product.entity";

@ObjectType()
export class Wishlist {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => User, { nullable: false })
    user: User;
    @Field(() => Product, { nullable: false })
    product: Product;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    update_at: Date;
}