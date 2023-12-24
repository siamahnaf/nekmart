import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";

export interface AddCouponData {
    addCoupon: SuccessInfo;
}

export interface CouponAdminData {
    id: string;
    name: string;
    code: string;
    discount: string;
    discountUnit: string;
    minimumPurchase: string;
    expires: string;
}


export interface GetCouponsData {
    getCouponByAdmin: {
        results: CouponAdminData[];
        meta: MetaInfo;
    }
}

export interface DeleteCouponData {
    deleteCoupon: SuccessInfo
}

export interface GetSingleCoupon {
    getSingleCouponByAdmin: CouponAdminData;
}

export interface UpdateCouponData {
    updateCoupon: SuccessInfo;
}