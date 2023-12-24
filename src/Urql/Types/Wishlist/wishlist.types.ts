import { SuccessInfo } from "../Success.types";
import { ProductData } from "../Products/product.types";

export interface AddWishlistData {
    addWishlist: SuccessInfo;
}

export interface CheckWishlistData {
    checkWishlist: {
        status: boolean;
        message: string;
    }
}

export interface WishlistData {
    id: string;
    product: ProductData;
}


export interface GetWishlistData {
    getWishlist: WishlistData[];
}

export interface DeleteWishlist {
    deleteWishlist: SuccessInfo;
}