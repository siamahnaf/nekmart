import { ProfileData } from "../Authentication/auth.types";
import { ProductData } from "../Product/product.types";
import { OrderData } from "../Order/order.types";
import { SellerData } from "../Seller/seller.types";
import { AddressData } from "../Order/order.types";
import { MetaInfo } from "../Meta.types";
import { SuccessInfo } from "../Success.types";

export interface OrderVariation {
    id: string;
    name: string;
    variant: string;
}

export interface RefundableData {
    id: string;
    productId?: ProductData;
    order?: OrderData;
    quantity?: number;
    variation: OrderVariation[];
    seller?: SellerData;
    address?: AddressData;
    couponDiscount: number;
    amount: number;
    created_at: Date;
    updated_at: Date;
}

export interface RefundData {
    id: string;
    refundableId?: RefundableData;
    user?: ProfileData;
    quantity?: number;
    reason: string;
    description: string;
    status: string;
    created_at: Date;
}

export interface GetRefundData {
    getRefundByAdmin: {
        results: RefundData[];
        meta: MetaInfo;
    }
}

export interface ChangeRefundStatus {
    changeRefundStatus: SuccessInfo;
}