import { SuccessInfo } from "../Success.types";

export interface SellerLoginData {
    loginSeller: SuccessInfo;
}

export interface ProfileData {
    id: string;
    name?: string;
    phone: string;
    email?: string;
    avatar?: string;
    is_verified: boolean;
    role: string;
}

export interface GetProfileData {
    getProfile: ProfileData;
}