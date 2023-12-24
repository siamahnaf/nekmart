import { SuccessInfo } from "../Success.types";
import { SellerData } from "../Authentication/profile.types";
import { MetaInfo } from "../Meta.types";

export interface CommonData {
    id: string;
    name: string
}

export interface AddProductData {
    addProduct: SuccessInfo;
};

interface ProductAttributeValues {
    variant?: string;
    price?: string;
    quantity?: string;
    image?: string;
}

interface ProductAttributeVariant {
    id?: string;
    selected: string[];
}

interface ProductAttribute {
    id?: string;
    attributeIds: CommonData[];
    selectedVariant: ProductAttributeVariant[];
    attributes: ProductAttributeValues[];
}

interface ProductSpecification {
    title?: string;
    value?: string;
}

interface ProductMeta {
    title?: string;
    description?: string;
    metaTags: string[];
    image?: string;
}

export interface ProductData {
    id: string;
    name: string;
    seller: SellerData;
    main_category: CommonData;
    category?: CommonData;
    sub_category?: CommonData[];
    brand?: CommonData;
    unit?: string;
    minPurchase?: string;
    tag?: CommonData[];
    refundAble: boolean;
    images: string[];
    youtubeLink?: string;
    flash?: { title: string, id: string };
    price: string;
    quantity: string;
    discount: string;
    discountUnit: string;
    attributes?: ProductAttribute;
    description?: string;
    specification: ProductSpecification[];
    visibility: boolean;
    is_approved: boolean;
    meta?: ProductMeta;
    estimateDelivery?: string;
    warranty?: string;
    showStock: boolean;
    tax: string;
    taxUnit: string;
    totalPrice: string;
    disclaimer: string;
    created_at: Date;
    updated_at: Date;
}

export interface GetOwnProductsData {
    getOwnSellerProducts: {
        results: ProductData[];
        meta: MetaInfo
    }
}

export interface DeleteProducts {
    deleteProduct: SuccessInfo;
}

export interface GetSingleProductData {
    getProduct: ProductData;
}

export interface UpdateProductData {
    updateProduct: SuccessInfo;
}