import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface SellerData {
    id: string;
    shopName: string;
    logo: string;
    banner: string;
    totalRating: number;
    totalReview: number;
}

export interface GetSellerData {
    getSellers: {
        results: SellerData[];
        meta: MetaInfo;
    }
}

export interface GetSingleSellerData {
    getSeller: SellerData;
}

export interface AddSellerData {
    createSeller: SuccessInfo;
}

export interface VerifySellerPhone {
    verifySellerPhone: SuccessInfo;
}