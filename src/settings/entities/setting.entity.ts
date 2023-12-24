import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Settings {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => String, { nullable: true })
    logo: string;
    @Field(() => String, { nullable: true })
    icon: string;
    @Field(() => String, { nullable: true })
    siteTitle: string;
    @Field(() => String, { nullable: true })
    slogan: string;
    @Field(() => String, { nullable: true })
    metaTitle: string;
    @Field(() => String, { nullable: true })
    metaDescription: string;
    @Field(() => [String], { nullable: true })
    metaTag: string[];
    @Field(() => String, { nullable: true })
    siteUrl: string;
    @Field(() => String, { nullable: true })
    ogTitle: string;
    @Field(() => String, { nullable: true })
    ogDescription: string;
    @Field(() => String, { nullable: true })
    ogImage: string;
    @Field(() => String, { nullable: true })
    email: string;
    @Field(() => String, { nullable: true })
    phone: string;
    @Field(() => String, { nullable: true })
    corporateOffice: string;
    @Field(() => String, { nullable: true })
    headOffice: string;
    @Field(() => String, { nullable: true })
    facebook: string;
    @Field(() => String, { nullable: true })
    instagram: string;
    @Field(() => String, { nullable: true })
    youtube: string;
    @Field(() => String, { nullable: true })
    twitter: string;
    @Field(() => String, { nullable: true })
    linkedIn: string;
    @Field(() => Date, { nullable: true })
    created_at: Date;
    @Field(() => Date, { nullable: true })
    updated_at: Date;
}