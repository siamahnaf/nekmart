import { ProductData } from "../Products/product.types";

export interface BannerData {
    id: string;
    name: string;
    url: string;
    path: string;
}

export interface GetBannerOne {
    getBannerOne: BannerData[];
}

export interface GetBannerTwo {
    getBannerTwo: BannerData[];
}

export interface SectionsData {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    base: string;
    category: {
        name: string;
        id: string;
    }
}

export interface GetSectionData {
    getSectionProducts: {
        section: SectionsData;
        products: ProductData[];
    }[];
}
