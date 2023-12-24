import { gql } from "urql";

export const GET_REFUNDABLE_PRODUCTS = gql`
query getRefundableProducts {
    getRefundableProducts {
      id
      productId {
        name
        images
      }
      order {
        orderId
      }
      quantity
      variation {
        name
        variant
      }
    }
}
`;

export const ADD_REFUND = gql`
mutation addRefund($refundInput: RefundInput!) {
  addRefund(refundInput: $refundInput) {
    success
    message
  }
}
`;

export const GET_REFUND_PRODUCT = gql`
query getRefundByUser {
  getRefundByUser {
    id
    refundableId {
      productId {
        name
        images
      }
      order {
        orderId
      }
    }
    quantity
    status
    created_at
  }
}
`;