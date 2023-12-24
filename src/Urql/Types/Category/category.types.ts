export interface CategoryData {
    id: string;
    name: string;
    image?: string;
    category: {
        id: string;
        name: string;
        image: string;
        sub_category: {
            id: string;
            name: string;
            image: string;
        }[];
    }[];
}

export interface GetCategoriesData {
    getMainCategories: {
        results: CategoryData[];
    }
}