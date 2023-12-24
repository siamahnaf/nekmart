import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class Address {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: false })
    phone: string;
    @Field(() => String, { nullable: true })
    gender: string;
    @Field(() => String, { nullable: false })
    address: string;
    @Field(() => String, { nullable: false })
    country: string;
    @Field(() => String, { nullable: false })
    city: string;
    @Field(() => String, { nullable: false })
    area: string;
    @Field(() => String, { nullable: false })
    postal: string;
    @Field(() => Boolean, { nullable: true })
    default: boolean;
    @Field(() => User, { nullable: true })
    user: User;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}