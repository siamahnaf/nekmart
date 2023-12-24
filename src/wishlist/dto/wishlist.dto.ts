import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class WishlistInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    productId: string;
}
