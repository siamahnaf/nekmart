interface FlashData {
    id: string;
    title: string;
    image?: string;
    thumb?: string;
    start: Date;
    expires: Date;
    discount: string;
    discountUnit: string;
}

export interface GetRunningFlashData {
    getRunningFlashes: {
        results: FlashData[];
    }
}

export interface GetSingleFlashData {
    getFlash: FlashData;
}