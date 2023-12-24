import { gql } from "urql";

export const ADD_ORDER = gql`
mutation addOrder($orderInput: OrderInput!) {
    addOrder(orderInput: $orderInput) {
      success
      message
      redirectUri
    }
}  
`;

export const GET_ORDER = gql`
query trackOrder($trackInput: TrackInput!) {
  trackOrder(trackInput: $trackInput) {
    id
    orderId
    sellers {
      id
      products {
        productId {
          name
          images
          estimateDelivery
        }
      }
    }
    total
    shippingFees
    shippingCount
    subtotal
    estimateDelivery
  }
}
`;

export const PAY_AGAIN = gql`
mutation payAgain($orderId: String!) {
  payAgain(orderId: $orderId) {
    success
    message
    redirectUri
  }
}
`;

export const GET_MY_ORDER = gql`
query getOrderByUser {
  getOrderByUser {
    id
    orderId
    sellers {
      sellerId {
        id
      }
      products {
        productId {
          id
          images
          name
        }
        quantity
      }
      status
    }
    estimateDelivery
    created_at
  }
}
`;


export const GET_SINGLE_ORDER = gql`
query getSingleOrderByUser($getSingleOrderByUserId: String!) {
  getSingleOrderByUser(id: $getSingleOrderByUserId) {
    id
    orderId
    sellers {
      id
      sellerId {
        shopName
      }
      products {
        productId {
          images
          name
        }
        quantity
        amount
        tax
        variation {
          id
          name
          variant
        }
      }
      status
      price
    }
    total
    shippingCount
    shippingFees
    couponDiscount
    subtotal
    user {
      name
      phone
    }
    shippingAddress {
      name
      phone
      gender
      address
      city
      area
      country
      postal
    }
    billingAddress {
      name
      phone
      gender
      address
      city
      area
      country
      postal
    }
  }
}
`;


export const CANCEL_ORDER = gql`
mutation cancelOrderStatusByUser($orderSellerId: String!) {
  cancelOrderStatusByUser(orderSellerId: $orderSellerId) {
    success
    message
  }
}
`;