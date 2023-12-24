import { gql } from "urql";

export const GET_USER_POINTS = gql`
query getUserPoints {
    getUserPoints {
      id
      points
    }
}
`;

export const GET_POINTS = gql`
query getPoints {
    getPoints {
      id
      points
      order {
        orderId
      }
      created_at
    }
}
`;

export const GET_COUPON_CODE = gql`
query getCouponByUser {
  getCouponByUser {
    id
    code
    discount
    discountUnit
    points
    created_at
  }
}
`;

export const REDEEM_CODE = gql`
mutation redeemCoupon($redeemInput: RedeemInput!) {
  redeemCoupon(redeemInput: $redeemInput) {
    success
    message
    code
  }
}
`;