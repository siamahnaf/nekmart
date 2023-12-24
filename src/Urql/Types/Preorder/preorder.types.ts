import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface PreorderData {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    email: string;
    productImage?: string[];
    productUrl: string[];
    note?: string;
    created_at: Date;
}

export interface GetPreOrderData {
    getPreorder: {
        results: PreorderData[];
        meta: MetaInfo
    }
}

export interface DeletePreOrder {
    deletePreorder: SuccessInfo;
}