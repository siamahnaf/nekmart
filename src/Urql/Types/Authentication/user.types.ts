import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

interface UserData {
    id: string;
    name?: string;
    phone: string;
    email?: string;
    avatar?: string;
    role: string;
    provider?: {
        id?: string;
        name?: string;
    };
    is_verified: boolean;
    is_banned: boolean;
}

export interface GetUsersData {
    getUsers: {
        results: UserData[];
        meta: MetaInfo;
    }
}


export interface BanOrUnbannedUserData {
    banOrUnbannedUser: SuccessInfo;
}

export interface AddAdminData {
    addAdmins: SuccessInfo;
}

export interface GetAdminData {
    getAdmins: {
        results: UserData[];
        meta: MetaInfo;
    }
}

export interface RemoveAdminData {
    removeAdmin: SuccessInfo;
}