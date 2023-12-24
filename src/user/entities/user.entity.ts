import { ObjectType, Field } from "@nestjs/graphql";

//Entity
import { Meta } from "./meta.entity";

@ObjectType()
export class Provider {
    @Field(() => String, { nullable: true })
    name: string;
    @Field(() => String, { nullable: true })
    id: string;
}

@ObjectType()
export class User {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: true })
    name: string;
    @Field(() => String, { nullable: false })
    phone: string;
    @Field(() => String, { nullable: true })
    email: string;
    @Field(() => String, { nullable: true })
    avatar: string;
    @Field(() => Provider, { nullable: true })
    provider: Provider;
    @Field(() => Boolean, { nullable: false })
    is_verified: boolean;
    @Field(() => Boolean, { nullable: false })
    is_banned: boolean;
    @Field(() => String, { nullable: false })
    role: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetUsers {
    @Field(() => [User], { nullable: true })
    results: User[];
    @Field(() => Meta, { nullable: true })
    meta: Meta;
}