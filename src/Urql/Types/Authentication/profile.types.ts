import { SuccessInfo } from "../Success.types";

export interface BankData {
    id: string;
    name: string;
    accNumber: string;
    routing: string;
    bankName: string;
    branch: string;
}

export interface SellerData {
    id: string;
    shopName: string;
    phone: string;
    logo: string;
    banner: string;
    address: string;
    metaTitle?: string;
    metaDescription?: string;
    is_verified: boolean;
    is_banned: boolean;
    bank?: BankData;
    created_at: Date;
    updated_at: Date;
}

export interface GetSellerProfileData {
    getSellerProfile: SellerData;
}

export interface UpdateSellerData {
    updateSeller: SuccessInfo;
}

export interface UpdateProfileData {
    updateProfile: SuccessInfo;
}

export interface UpdatePasswordData {
    changePassword: SuccessInfo;
}