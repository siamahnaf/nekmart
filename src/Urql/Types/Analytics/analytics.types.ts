import { AddressData } from "../Checkout/checkout.types";

export interface UserAnalytics {
    totalCart?: number;
    totalWishlist?: number;
    totalOrder?: number;
    defaultAddress?: AddressData;
}


export interface GetAnalyticsData {
    getAnalyticsByUser: UserAnalytics;
}