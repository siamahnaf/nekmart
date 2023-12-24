export interface ValuesData {
    value: string;
    meta: string;
}

export interface AttributeData {
    id: string;
    name: string;
    values: ValuesData[];
}

export interface GetAttributesData {
    getAttributes: {
        results: AttributeData[];
    }
}