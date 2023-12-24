export interface BrandData {
    id: string;
    name: string;
}

export interface GetBrandData {
    getBrands: {
        results: BrandData[];
    }
}