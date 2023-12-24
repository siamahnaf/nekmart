export interface BrandData {
    id: string;
    name: string;
    image?: string;
}

export interface GetBrandData {
    getBrands: {
        results: BrandData[];
    }
}