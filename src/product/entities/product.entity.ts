import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";
import { Seller } from "@/seller/entities/seller.entity";
import { MainCategory } from "@/category/entities/main-category.entity";
import { Category } from "@/category/entities/category.entity";
import { SubCategory } from "@/category/entities/sub-category.entity";
import { Brand } from "@/brand/entities/brand.entity";
import { Tag } from "@/tag/entities/tag.entity";
import { Flash } from "@/flash/entities/flash.entity";
import { Attribute } from "@/attributes/entities/attribute.entity";

@ObjectType()
class ProductAttributeValues {
    @Field(() => String, { nullable: true })
    variant: string;
    @Field(() => String, { nullable: true })
    price: string;
    @Field(() => String, { nullable: true })
    quantity: string;
    @Field(() => String, { nullable: true })
    image: string;
}

@ObjectType()
class ProductAttributeVariant {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => [String], { nullable: true })
    selected: string[];
}

@ObjectType()
class ProductAttribute {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => [Attribute], { nullable: true })
    attributeIds: Attribute[];
    @Field(() => [ProductAttributeVariant], { nullable: true })
    selectedVariant: ProductAttributeVariant[];
    @Field(() => [ProductAttributeValues], { nullable: true })
    attributes: ProductAttributeValues[];
}

@ObjectType()
class ProductSpecification {
    @Field(() => String, { nullable: true })
    title: string;
    @Field(() => String, { nullable: true })
    value: string;
}

@ObjectType()
class ProductMeta {
    @Field(() => String, { nullable: true })
    title: string;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => [String], { nullable: true })
    metaTags: string[];
    @Field(() => String, { nullable: true })
    image: string;
}


@ObjectType()
export class Product {
    @Field(() => String, { nullable: true })
    id: string;
    @Field(() => String, { nullable: false })
    name: string;
    @Field(() => Seller, { nullable: false })
    seller: Seller;
    @Field(() => MainCategory, { nullable: false })
    main_category: MainCategory;
    @Field(() => Category, { nullable: true })
    category: Category;
    @Field(() => [SubCategory], { nullable: true })
    sub_category: SubCategory[];
    @Field(() => Brand, { nullable: true })
    brand: Brand;
    @Field(() => String, { nullable: true })
    unit: string;
    @Field(() => String, { nullable: true })
    minPurchase: string;
    @Field(() => [Tag], { nullable: true })
    tag: Tag[];
    @Field(() => Boolean, { nullable: false })
    refundAble: boolean;
    @Field(() => [String], { nullable: false })
    images: string[];
    @Field(() => String, { nullable: true })
    youtubeLink: string;
    @Field(() => Flash, { nullable: true })
    flash: Flash;
    @Field(() => String, { nullable: false })
    price: string;
    @Field(() => String, { nullable: false })
    quantity: string;
    @Field(() => String, { nullable: false })
    discount: string;
    @Field(() => String, { nullable: false })
    discountUnit: string;
    @Field(() => ProductAttribute, { nullable: true })
    attributes: ProductAttribute;
    @Field(() => String, { nullable: true })
    description: string;
    @Field(() => [ProductSpecification], { nullable: true })
    specification: ProductSpecification[];
    @Field(() => Boolean, { nullable: false })
    visibility: boolean;
    @Field(() => Boolean, { nullable: false })
    is_approved: boolean;
    @Field(() => ProductMeta, { nullable: true })
    meta: ProductMeta;
    @Field(() => String, { nullable: true })
    estimateDelivery: string;
    @Field(() => String, { nullable: true })
    warranty: string;
    @Field(() => Boolean, { nullable: false })
    showStock: boolean;
    @Field(() => String, { nullable: false })
    tax: string;
    @Field(() => String, { nullable: false })
    taxUnit: string;
    @Field(() => String, { nullable: false })
    totalPrice: string;
    @Field(() => String, { nullable: false })
    disclaimer: string;
    @Field(() => Date, { nullable: false })
    created_at: Date;
    @Field(() => Date, { nullable: false })
    updated_at: Date;
}

@ObjectType()
export class GetProducts {
    @Field(() => [Product], { nullable: false })
    results: [Product];
    @Field(() => Meta, { nullable: false })
    meta: Meta;
}