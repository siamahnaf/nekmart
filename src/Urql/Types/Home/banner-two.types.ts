import { SuccessInfo } from "../Success.types";
import { BannerData } from "./banner-one.types";

export interface AddBannerTwoData {
    addBannerTwo: SuccessInfo
}

export interface GetBannerTwoData {
    getBannerTwo: BannerData[];
}

export interface DeleteBannerTwoData {
    deleteBannerTwo: SuccessInfo;
}

export interface UpdateBannerTwoData {
    updateBannerTwo: SuccessInfo;
}