import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";

export interface AddBrandData {
    addBrand: SuccessInfo
}

export interface BrandData {
    id: string;
    name: string;
    description?: string;
    image?: string;
}

export interface GetBrandsData {
    getBrands: {
        results: BrandData[];
        meta: MetaInfo
    }
}

export interface DeleteBrandData {
    deleteBrand: SuccessInfo
}

export interface GetSingleBrandData {
    getBrand: BrandData
}

export interface UpdateBrandData {
    updateBrand: SuccessInfo;
}