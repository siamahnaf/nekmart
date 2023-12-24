export interface CategoryData {
    name: string;
    id: string;
}

export interface GetMainCategoryData {
    getMainCategories: {
        results: CategoryData[];
    }
}

export interface GetCategoryData {
    getCategories: {
        results: CategoryData[];
    }
}

export interface GetSubCategoryData {
    getSubCategories: {
        results: CategoryData[];
    }
}