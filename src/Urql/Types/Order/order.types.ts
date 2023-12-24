import { MetaInfo } from "../Meta.types";
import { ProductData } from "../Product/product.types";
import { SellerData } from "../Seller/seller.types";
import { ProfileData } from "../Authentication/auth.types";
import { SuccessInfo } from "../Success.types";

export interface AddressData {
    id: string;
    name: string;
    phone: string;
    gender?: string;
    address: string;
    country: string;
    city: string;
    area: string;
    postal: string;
    default?: boolean;
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
    user?: ProfileData;
    paymentStatus: boolean;
    created_at: Date;
}

export interface GetOrdersData {
    getOrders: {
        results: OrderData[];
        meta: MetaInfo
    }
}

export interface GetSingleOrder {
    getOrder: OrderData;
}

export interface UpdateOrderNote {
    orderNote: SuccessInfo;
}

export interface ChangeOrderStatus {
    changeOrderStatus: SuccessInfo;
}

export interface CancelOrderStatus {
    cancelOrderStatusByAdmin: SuccessInfo;
}