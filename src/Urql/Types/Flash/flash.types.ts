import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";

export interface AddFlashData {
    addFlash: SuccessInfo;
}

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

export interface GetFlashData {
    getFlashes: {
        results: FlashData[];
        meta: MetaInfo;
    }
}

export interface DeleteFlashData {
    deleteFlash: SuccessInfo;
}

export interface GetSingleFlash {
    getFlash: FlashData;
}

export interface UpdateFlash {
    updateFlash: SuccessInfo;
}