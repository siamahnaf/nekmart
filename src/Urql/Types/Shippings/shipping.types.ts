import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface AddShippingData {
    addShipping: SuccessInfo;
}

export interface ShippingData {
    id: string;
    name: string;
    rateInsideDhaka: string;
    rateOutsideDhaka: string;
    rateInSavar: string;
    active: boolean;
    estimateDelivery: string;
    description?: string;
}

export interface GetShippingData {
    getShippings: {
        results: ShippingData[];
        meta: MetaInfo;
    }
}


export interface DeleteShippingData {
    deleteShipping: SuccessInfo;
}

export interface ChangeActiveStatus {
    setShippingAsActive: SuccessInfo
}

export interface GetSingleShipping {
    getShipping: ShippingData;
}

export interface UpdateShipping {
    updateShipping: SuccessInfo;
}