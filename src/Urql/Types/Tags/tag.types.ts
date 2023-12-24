export interface TagData {
    id: string;
    name: string;
}

export interface GetTagData {
    getTags: {
        results: TagData[];
    }
}