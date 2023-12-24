import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Bank {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    accNumber: string;
    @Field(() => String, { nullable: false })
    routing: string;
    @Field(() => String, { nullable: false })
    bankName: string;
    @Field(() => String, { nullable: false })
    branch: string;
}

@ObjectType()
export class Seller {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    shopName: string;
    @Field(() => String, { nullable: false })
    phone: string;
    @Field(() => String, { nullable: false })
    logo: string;
    @Field(() => String, { nullable: false })
    banner: string;
    @Field(() => String, { nullable: false })
    address: string;
    @Field(() => String, { nullable: true })
    metaTitle: string;
    @Field(() => String, { nullable: true })
    metaDescription: string;
    @Field(() => Boolean, { nullable: false })
    is_verified: boolean;
    @Field(() => Boolean, { nullable: false })
    is_banned: boolean;
    @Field(() => Bank, { nullable: true })
    bank: Bank;
    @Field(() => User, { nullable: true })
    user: User;
    @Field(() => Float, { nullable: false })
    totalReview: number;
    @Field(() => Float, { nullable: false })
    totalRating: number;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetSellers {
    @Field(() => [Seller], { nullable: false })
    results: [Seller];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}