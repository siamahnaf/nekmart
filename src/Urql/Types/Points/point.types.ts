import { OrderData } from "../Order/order.types";
import { SuccessInfo } from "../Success.types";

export interface Points {
    id: string;
    points: number;
    order?: OrderData;
    created_at: Date;
}

export interface UserPoints {
    id: string;
    points: number;
}

export interface GetPointsData {
    getPoints: Points[];
}

export interface GetUserPoints {
    getUserPoints: UserPoints;
}

export interface CouponUserData {
    id: string;
    code: string;
    discount: string;
    discountUnit: string;
    points: string;
    created_at: Date;
}

export interface GetCouponData {
    getCouponByUser: CouponUserData[];
}

export interface RedeemCodeData {
    redeemCoupon: SuccessInfo;
}