import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


@InputType()
export class PaymentInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    paymentMethod: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    paymentId: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    provider: string;
}

@InputType()
export class OrderVariationInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsOptional()
    id: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsOptional()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsOptional()
    variant: string;
}

@InputType()
export class OrderProductsInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @Field(() => [OrderVariationInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => OrderVariationInput)
    variation: OrderVariationInput[];

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    tax: number;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    amount: number;
}

@InputType()
export class OrderSellerInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    sellerId: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    shopName: string;

    @Field(() => [OrderProductsInput], { nullable: false })
    @IsArray()
    @ValidateNested()
    @Type(() => OrderProductsInput)
    products: OrderProductsInput[];

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    price: number;
}

@InputType()
export class OrderInput {
    @Field(() => [OrderSellerInput], { nullable: true })
    @IsArray()
    @ValidateNested()
    @Type(() => OrderSellerInput)
    sellers: OrderSellerInput[];

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    couponDiscount: number;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    cartId: string[];

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    subtotal: number;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    shippingFees: number;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    shippingCount: number;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    estimateDelivery: string;


    @Field(() => PaymentInput, { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => PaymentInput)
    payment: PaymentInput;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    billingAddress: string;
}