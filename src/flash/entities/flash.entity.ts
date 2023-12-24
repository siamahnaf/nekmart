import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Flash {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    title: string;
    @Field(() => String, { nullable: true })
    image: string;
    @Field(() => String, { nullable: true })
    thumb: string;
    @Field(() => Date, { nullable: false })
    start: Date;
    @Field(() => Date, { nullable: false })
    expires: Date;
    @Field(() => String, { nullable: false })
    discount: string;
    @Field(() => String, { nullable: false })
    discountUnit: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}



@ObjectType()
export class GetFlashes {
    @Field(() => [Flash], { nullable: false })
    results: [Flash];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}