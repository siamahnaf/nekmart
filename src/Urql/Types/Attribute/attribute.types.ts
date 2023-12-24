import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface AddAttributeData {
    addAttribute: SuccessInfo;
}

export interface AttributeData {
    id: string;
    name: string;
    values: { value: string, meta: string }[];
}

export interface GetAttributeData {
    getAttributes: {
        results: AttributeData[];
        meta: MetaInfo;
    }
}

export interface DeleteAttributeData {
    deleteAttribute: SuccessInfo;
}

export interface GetSingleAttributeData {
    getAttribute: AttributeData;
}

export interface UpdateAttributeData {
    updateAttribute: SuccessInfo;
}