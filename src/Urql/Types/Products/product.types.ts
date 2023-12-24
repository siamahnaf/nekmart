//Imports
import { SellerData } from "../Seller/seller.types";
import { MetaInfo } from "../Meta.types";

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
    attributeIds: { id: string, name: string }[];
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
    id?: string;
    name: string;
    seller: SellerData;
    main_category: { id: string, name: string };
    category?: { id: string, name: string };
    sub_category: { id: string, name: string }[];
    brand?: { id: string, name: string };
    unit?: string;
    minPurchase?: string;
    tag: { id: string, name: string }[];
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


export interface GetFlashProduct {
    getFlashProduct: {
        results: ProductData[];
        meta: MetaInfo;
    }
}

export interface GetSingleProduct {
    getProduct: ProductData;
}

export interface GetSellingProduct {
    getSellingProduct: ProductData[];
}

export interface GetProductBySeller {
    getProductBySeller: {
        results: ProductData[];
        meta: MetaInfo;
    }
}