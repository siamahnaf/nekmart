import { gql } from "urql";

export const ADD_CART = gql`
mutation addCart($cartInput: CartInput!) {
    addCart(cartInput: $cartInput) {
      success
      message
    }
}
`;

export const GET_CART = gql`
query getCarts {
  getCarts {
    id
    seller {
      id
      shopName
    }
    productId {
      id
      name
      images
      totalPrice
      discount
      quantity
      discountUnit
      minPurchase
      tax
      taxUnit
      attributes {
        attributes {
          price
          quantity
          image
          variant
        }
      }
    }
    reserved
    attributes {
      id
      name
      variant
    }
  }
}
`;

export const DELETE_CART = gql`
mutation deleteCart($deleteCartId: String!) {
  deleteCart(id: $deleteCartId) {
    success
    message
  }
}
`;

export const INCREASE_CART = gql`
mutation increaseCart($increaseCartId: String!) {
  increaseCart(id: $increaseCartId) {
    success
    message
  }
}
`;

export const DECREASE_CART = gql`
mutation decreaseCart($decreaseCartId: String!) {
  decreaseCart(id: $decreaseCartId) {
    success
    message
  }
}
`;