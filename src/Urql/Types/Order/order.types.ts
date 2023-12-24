import { MetaInfo } from "../Meta.types";
import { ProductData } from "../Products/product.types";

export interface OrderVariation {
    id: string;
    name: string;
    variant: string;
}

export interface OrderProduct {
    productId?: ProductData;
    quantity: number;
    variation: OrderVariation[];
    tax: number;
    amount: number;
}


export interface OrderSellerData {
    id: string;
    products: OrderProduct[];
    order?: {
        orderId: string;
        shippingAddress: {
            name: string;
        }
        estimateDelivery: string;
    };
    price: number;
    status: string;
    cancelBy: string;
    created_at: Date;
    updated_at: Date;
}


export interface GetOrdersData {
    getOrdersBySeller: {
        results: OrderSellerData[];
        meta: MetaInfo;
    }
}

export interface GetSingleOrder {
    getSingleOrderBySeller: OrderSellerData;
}