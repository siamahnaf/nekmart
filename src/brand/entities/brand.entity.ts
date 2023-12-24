import { ObjectType, Field } from "@nestjs/graphql";

//Meta
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Brand {
    @Field(() => String, { nullable: false })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => String, { nullable: true })
    image: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetBrands {
    @Field(() => [Brand], { nullable: false })
    results: Brand[];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}