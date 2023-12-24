import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class GoogleInput {
    @Field(() => String, { nullable: true })
    code: string;
    @Field(() => String, { nullable: true })
    idToken: string;
}