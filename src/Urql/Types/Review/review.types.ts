import { SuccessInfo } from "../Success.types";

export interface CheckReviewData {
    reviewAvailability: SuccessInfo;
}

export interface AddReviewData {
    addReviews: SuccessInfo;
}

export interface ReviewData {
    id: string;
    image: string[];
    comment: string;
    reply?: string;
    rating: number;
    seller: {
        shopName: string
    }
    user: {
        name: string;
        phone: string;
    };
    created_at: Date;
}

export interface GetReviewsData {
    getReviewByProduct: ReviewData[];
}