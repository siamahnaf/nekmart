import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class UserPoints {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => Float, { nullable: false })
    points: number;
    @Field(() => User, { nullable: true })
    user: User;
}