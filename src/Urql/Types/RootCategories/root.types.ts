import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";

export interface AddRootCategoryData {
    addMainCategory: SuccessInfo
}

export interface MainCategoryData {
    id: string;
    name: string;
    description?: string;
    image?: string;
}

export interface GetMainCategoriesData {
    getMainCategories: {
        results: MainCategoryData[];
        meta: MetaInfo;
    }
}

export interface DeleteMainCategoryData {
    deleteMainCategory: SuccessInfo;
}

export interface GetSingleMainCategory {
    getMainCategory: MainCategoryData;
}

export interface UpdateMainCategory {
    updateMainCategory: SuccessInfo;
}