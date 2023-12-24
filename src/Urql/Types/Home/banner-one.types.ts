import { SuccessInfo } from "../Success.types";

export interface AddBannerOneData {
    addBannerOne: SuccessInfo;
}

export interface BannerData {
    id: string;
    name: string;
    url: string;
    path: string;
}

export interface GetBannerOneData {
    getBannerOne: BannerData[]
}

export interface DeleteBannerOneData {
    deleteBannerOne: SuccessInfo;
}

export interface UpdateBannerOneData {
    updateBannerOne: SuccessInfo;
}