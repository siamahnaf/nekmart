import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsDate, IsEnum } from "class-validator";

@InputType()
export class CouponInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    code: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discount: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(["flat", "percent"], { message: "Discount unit should be 'flat' and 'percent'!" })
    discountUnit: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    minimumPurchase: string;

    @Field(() => Date, { nullable: false })
    @IsDate()
    @IsNotEmpty()
    expires: Date;
}