import { SuccessInfo } from "../Success.types";

export interface GetPlatformData {
    getPlatform: {
        charge: string;
    }
}

export interface AddPlatformData {
    addPlatform: SuccessInfo;
}