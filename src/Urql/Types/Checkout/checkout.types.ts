import { SuccessInfo } from "../Success.types";

export interface ApplyCouponData {
    applyCoupon: {
        success: boolean;
        message: string;
        discount: string;
    }
}

export interface AddressData {
    id: string;
    name: string;
    phone: string;
    gender?: string;
    address: string;
    country: string;
    city: string;
    area: string;
    postal: string;
    default?: boolean;
}

export interface GetAddressData {
    getAddress: AddressData[];
}

export interface AddAddressData {
    addAddress: SuccessInfo;
}

export interface UpdateAddressData {
    updateAddress: SuccessInfo;
}

export interface MarkAddressData {
    markAddDefault: SuccessInfo;
}

export interface DeleteAddressData {
    deleteAddress: SuccessInfo;
}

export interface ShippingData {
    id: string;
    rateInsideDhaka: string;
    rateOutsideDhaka: string;
    rateInSavar: string;
    estimateDelivery: string;
}

export interface GetActiveShipping {
    getActiveShipping: ShippingData;
} 