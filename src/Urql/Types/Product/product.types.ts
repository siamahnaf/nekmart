import { SellerData } from "../Seller/seller.types";
import { MainCategoryData } from "../RootCategories/root.types";
import { SubCategoryData } from "../SubCategories/sub.types";
import { CategoryData } from "../Categories/category.types";
import { BrandData } from "../Brand/brand.types";
import { TagData } from "../Tags/tag.types";
import { FlashData } from "../Flash/flash.types";
import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

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
    main_category: MainCategoryData;
    category?: CategoryData;
    sub_category?: SubCategoryData[];
    brand?: BrandData;
    unit?: string;
    minPurchase?: string;
    tag?: TagData[];
    refundAble: boolean;
    images: string[];
    youtubeLink?: string;
    flash?: FlashData;
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


export interface GetUnapprovedProducts {
    getUnapprovedProduct: {
        results: ProductData[];
        meta: MetaInfo;
    }
}

export interface GetSingleProductData {
    getProduct: ProductData;
}

export interface ApproveProductData {
    approvedProduct: SuccessInfo;
}