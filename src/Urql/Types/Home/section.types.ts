import { SuccessInfo } from "../Success.types";

export interface AddSectionData {
    addSection: SuccessInfo;
}

export interface SectionsData {
    id: string;
    name: string;
    description: string;
    publish: boolean;
    base: string;
    category?: {
        id: string;
        name: string;
    };
}


export interface GetSectionsData {
    getSections: SectionsData[];
}

export interface DeleteSectionData {
    deleteSection: SuccessInfo;
}

export interface UpdateSectionData {
    updateSection: SuccessInfo
}