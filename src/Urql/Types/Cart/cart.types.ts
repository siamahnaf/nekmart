import { SuccessInfo } from "../Success.types";
import { ProductData } from "../Products/product.types";

export interface AddCartData {
    addCart: SuccessInfo;
}

export interface CartData {
    id: string;
    productId: ProductData;
    reserved: number;
    seller: { id: string, shopName: string };
    attributes: { id: string, name: string, variant: string }[];
}


export interface GetCartData {
    getCarts: CartData[];
}

export interface DeleteCartData {
    deleteCart: SuccessInfo;
}

export interface IncreaseCartData {
    increaseCart: SuccessInfo;
}


export interface DecreaseCartData {
    decreaseCart: SuccessInfo;
}
