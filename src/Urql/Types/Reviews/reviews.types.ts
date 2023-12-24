import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface ReviewData {
    id: string;
    user?: {
        name: string;
        phone: string;
    };
    seller?: {
        shopName: string;
    };
    product?: {
        name: string;
    };
    image: string[];
    comment: string;
    reply?: string;
    rating: number;
    publish: boolean;
    created_at: Date;
}


export interface GetReviewData {
    getReviewBySeller: {
        results: ReviewData[];
        meta: MetaInfo;
    }
}

export interface AddReplyData {
    replyReview: SuccessInfo
}