import { gql } from "urql";

export const GET_SELLERS = gql`
query getSellersByAdmin($searchInput: SearchInput!) {
    getSellersByAdmin(searchInput: $searchInput) {
      results {
        id
        shopName
        phone
        logo
        is_verified
        is_banned
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


export const BAN_OR_UNBANNED_SELLER = gql`
mutation banOrUnbannedSeller($banOrUnbannedSellerId: String!, $status: Boolean!) {
    banOrUnbannedSeller(id: $banOrUnbannedSellerId, status: $status) {
      success
      message
    }
}
`;

export const GET_SINGLE_SELLER = gql`
query getSellerByAdmin($getSellerByAdminId: String!) {
    getSellerByAdmin(id: $getSellerByAdminId) {
      id
      shopName
      phone
      logo
      banner
      address
      metaTitle
      metaDescription
      is_verified
      is_banned
      bank {
        name
        accNumber
        routing
        bankName
        branch
      }
    }
}  
`;

export const VERIFY_SELLER = gql`
mutation verifySeller($verifySellerId: String!) {
    verifySeller(id: $verifySellerId) {
      success
      message
    }
}
`;