import { SuccessInfo } from "../Success.types";

export interface RefundableProduct {
    id: string;
    productId?: {
        name: string;
        images: string[];
    }
    order?: {
        orderId: string
    }
    quantity: number;
    variation?: {
        name: string;
        variant: string;
    }
}

export interface GetRefundableProducts {
    getRefundableProducts: RefundableProduct[]
}

export interface AddRefundData {
    addRefund: SuccessInfo;
}

export interface RefundData {
    id: string;
    refundableId?: RefundableProduct;
    quantity?: number;
    reason: string;
    description: string;
    status: string;
    created_at: Date;
}

export interface GetRefundData {
    getRefundByUser: RefundData[];
}
