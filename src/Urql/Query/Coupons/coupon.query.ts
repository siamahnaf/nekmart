import { gql } from "urql";

export const ADD_COUPON = gql`
mutation addCoupon($couponInput: CouponInput!) {
    addCoupon(couponInput: $couponInput) {
      success
      message
    }
}
`;

export const GET_COUPONS = gql`
query getCouponByAdmin($searchInput: SearchInput!) {
    getCouponByAdmin(searchInput: $searchInput) {
      results {
        id
        name
        code
        discount
        minimumPurchase
        discountUnit
        expires
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
}  
`;

export const DELETE_COUPONS = gql`
mutation deleteCoupon($deleteCouponId: String!) {
    deleteCoupon(id: $deleteCouponId) {
      success
      message
    }
}
`;

export const GET_SINGLE_COUPON = gql`
query getSingleCouponByAdmin($getSingleCouponByAdminId: String!) {
    getSingleCouponByAdmin(id: $getSingleCouponByAdminId) {
      id
      name
      code
      discount
      minimumPurchase
      discountUnit
      expires
    }
}
`;

export const UPDATE_COUPON = gql`
mutation updateCoupon($couponInput: CouponInput!, $updateCouponId: String!) {
    updateCoupon(couponInput: $couponInput, id: $updateCouponId) {
      success
      message
    }
}
`;