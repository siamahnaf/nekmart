import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface AddSubCategoryData {
    addSubCategory: SuccessInfo;
}

export interface SubCategoryData {
    id: string;
    name: string;
    category?: {
        id: string;
        name: string;
    };
    image?: string;
}


export interface GetSubCategoriesData {
    getSubCategories: {
        results: SubCategoryData[];
        meta: MetaInfo;
    }
}

export interface DeleteSubCategoryData {
    deleteSubCategory: SuccessInfo;
}

export interface GetSingleSubCategory {
    getSubCategory: SubCategoryData;
}

export interface UpdateSubCategory {
    updateSubCategory: SuccessInfo;
}