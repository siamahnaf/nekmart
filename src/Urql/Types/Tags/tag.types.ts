import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";

export interface CreateTagData {
    addTag: SuccessInfo;
}

export interface TagData {
    id: string;
    name: string;
    description?: string;
}

export interface GetTagsData {
    getTags: {
        results: TagData[];
        meta: MetaInfo;
    }
}

export interface DeleteTagData {
    deleteTag: SuccessInfo;
}

export interface GetSingleTagData {
    getTag: TagData;
}

export interface UpdateTagData {
    updateTag: SuccessInfo;
}