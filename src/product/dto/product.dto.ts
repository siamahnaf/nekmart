import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsEnum, IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class ProductVariantInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    id: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    selected: string[];
}

@InputType()
export class ProductAttributeValueInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    variant: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    price: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    quantity: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image: string;
}



@InputType()
export class ProductAttributeInput {
    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    attributeIds: string[];

    @Field(() => [ProductVariantInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductVariantInput)
    selectedVariant: ProductVariantInput[];

    @Field(() => [ProductAttributeValueInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductAttributeValueInput)
    attributes: ProductAttributeValueInput[];
}

@InputType()
export class ProductSpecificationInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    title: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    value: string;
}

@InputType()
export class ProductMetaInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    title: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    metaTags: string[];

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image: string;
}

@InputType()
export class ProductInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    main_category: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    category: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    sub_category: string[];

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    brand: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    unit: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    minPurchase: string;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    tag: string[];

    @Field(() => Boolean)
    @IsBoolean()
    @IsNotEmpty()
    refundAble: boolean;

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    images: string[];

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    youtubeLink: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    flash: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    price: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    quantity: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discount: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(["flat", "percent"], { message: "Discount unit will be only 'flat' and 'percent'!" })
    discountUnit: string;

    @Field(() => ProductAttributeInput, { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductAttributeInput)
    attributes: ProductAttributeInput;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description: string;

    @Field(() => [ProductSpecificationInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductSpecificationInput)
    specification: ProductSpecificationInput[];

    @Field(() => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    visibility: boolean;

    @Field(() => ProductMetaInput, { nullable: true })
    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductMetaInput)
    meta: ProductMetaInput;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    estimateDelivery: string;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    warranty: string;

    @Field(() => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    showStock: boolean;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    tax: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(["flat", "percent"], { message: "Tax unit can be only 'flat' and 'percent'!" })
    taxUnit: string;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    disclaimer: string;
}