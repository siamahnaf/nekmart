import { ProductData } from "../Products/product.types";
import { SellerData } from "../Seller/seller.types";
import { AddressData } from "../Checkout/checkout.types";
import { SuccessInfo } from "../Success.types";

export interface AddOrderData {
    addOrder: {
        success: boolean;
        message: string;
        redirectUri: string;
    }
}

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

export interface OrderSeller {
    id: string;
    sellerId?: SellerData;
    products: OrderProduct[];
    order?: OrderData;
    price: number;
    status: string;
    cancelBy: string;
}

export interface PaymentInfo {
    paymentMethod?: string;
    paymentId?: string;
    provider?: string;
}

export interface OrderData {
    id: string;
    orderId: string;
    sellers: OrderSeller[];
    couponDiscount: number;
    total: number;
    subtotal: number;
    shippingFees: number;
    shippingCount: number;
    estimateDelivery: string;
    payment?: PaymentInfo;
    shippingAddress?: AddressData;
    billingAddress?: AddressData;
    note?: string;
    paymentStatus: boolean;
    created_at: Date;
}

export interface GetOrderData {
    trackOrder: OrderData;
}

export interface PayAgainData {
    payAgain: {
        success: true,
        message: string;
        redirectUri: string;
    };
}

export interface GetOrderByUser {
    getOrderByUser: OrderData[];
}

export interface GetSingleOrder {
    getSingleOrderByUser: OrderData;
}

export interface CancelOrderData {
    cancelOrderStatusByUser: SuccessInfo;
}