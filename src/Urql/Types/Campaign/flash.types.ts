import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface FlashData {
    id: string;
    title: string;
    image?: string;
    thumb?: string;
    start: Date;
    expires: Date;
    discount: string;
    discountUnit: string;
}

export interface GetCampaignData {
    getFlashes: {
        results: FlashData[];
        meta: MetaInfo;
    }
}

export interface GetRunningFlashData {
    getRunningFlashes: {
        results: FlashData[];
    }
}

export interface UpdateFlashProduct {
    updateFlashProduct: SuccessInfo;
}

export interface GetNoFlashProduct {
    getNoFlashProduct: {
        results: {
            id: string;
            name: string;
        }[];
    }
}