import { SuccessInfo } from "../Success.types";

export interface UserData {
    id: string;
    name?: string;
    phone: string;
    email?: string;
    avatar?: string;
}

export interface GetProfileData {
    getProfile: UserData;
}

export interface UpdateProfileData {
    updateProfile: SuccessInfo;
}

export interface UpdatePasswordData {
    changePassword: SuccessInfo;
}