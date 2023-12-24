import { createContext, SetStateAction, Dispatch } from "react";

//Types
export interface SellerTypes {
    sellerId: string;
    shopName: string;
    products: {
        productId: string;
        name: string;
        quantity: number;
        variation: {
            id: string;
            name: string;
            variant: string;
        }[];
        tax: number;
        amount: number;
    }[];
    price: number;
}
export interface CartTypes {
    sellers: SellerTypes[];
    couponDiscount?: number;
    total: number;
    cartId: string[];
    subtotal: number;
    shippingCount: number;
    shippingFees: number;
    estimateDelivery: string;
}
export interface AddressTypes {
    shippingAddress: string;
    billingAddress: string;
}
interface Context {
    activeStep?: number;
    handleNext?: () => void;
    handlePrev?: () => void;
    carts?: CartTypes | null;
    setCart?: Dispatch<SetStateAction<CartTypes | null>>;
    address?: AddressTypes | null;
    setAddress?: Dispatch<SetStateAction<AddressTypes | null>>;
}

export const checkoutContext = createContext<Context>({});