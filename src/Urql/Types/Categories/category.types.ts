import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";

export interface AddCategoryData {
    addCategory: SuccessInfo;
}

export interface CategoryData {
    id: string;
    name: string;
    image?: string;
    main_category?: {
        id: string;
        name: string;
    };
}

export interface GetCategoriesData {
    getCategories: {
        results: CategoryData[];
        meta: MetaInfo;
    }
}

export interface DeleteCategoryData {
    deleteCategory: SuccessInfo;
}

export interface GetSingleCategory {
    getCategory: CategoryData;
}

export interface UpdateCategoryData {
    updateCategory: SuccessInfo
}