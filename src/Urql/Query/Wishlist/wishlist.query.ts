import { gql } from "urql";

export const ADD_WISHLIST = gql`
mutation addWishlist($wishlistInput: WishlistInput!) {
    addWishlist(wishlistInput: $wishlistInput) {
      success
      message
    }
}
`;

export const CHECK_WISHLIST = gql`
query checkWishlist($productId: String!) {
    checkWishlist(productId: $productId) {
      status
      message
    }
}
`;

export const GET_WISHLIST = gql`
query getWishlist {
  getWishlist {
    id
    product {
      id
      name
      images
      totalPrice
    }
  }
}
`;

export const DELETE_WISHLIST = gql`
mutation deleteWishlist($deleteWishlistId: String!) {
  deleteWishlist(id: $deleteWishlistId) {
    success
    message
  }
}
`;