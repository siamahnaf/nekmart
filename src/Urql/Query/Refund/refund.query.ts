import { gql } from "urql";

export const GET_REFUND = gql`
query getRefundByAdmin($searchInput: SearchInput!) {
    getRefundByAdmin(searchInput: $searchInput) {
      results {
        id
        refundableId {
          productId {
            name
          }
          order {
            orderId
          }
          couponDiscount
          variation {
            name
            variant
          }
          seller {
            shopName
          }
          address {
            address
            city
            area
          }
        }
        user {
          name
          phone
        }
        quantity
        status
        reason
        description
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


export const CHANGE_REFUND_STATUS = gql`
mutation changeRefundStatus($changeRefundStatusId: String!, $refundStatusInput: RefundStatusInput!) {
  changeRefundStatus(id: $changeRefundStatusId, refundStatusInput: $refundStatusInput) {
    success
    message
  }
}
`;