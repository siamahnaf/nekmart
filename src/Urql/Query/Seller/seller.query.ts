import { gql } from "urql";

export const GET_SELLER = gql`
query getSellers($searchInput: SearchInput!) {
    getSellers(searchInput: $searchInput) {
      results {
        id
        shopName
        logo
        totalRating
        totalReview
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

export const GET_SINGLE_SELLER = gql`
query getSeller($getSellerId: String!) {
  getSeller(id: $getSellerId) {
    id
    banner
    logo
    shopName
    totalRating
    totalReview
  }
}
`;

export const ADD_SELLER = gql`
mutation createSeller($sellerInput: SellerInput!) {
  createSeller(sellerInput: $sellerInput) {
    success
    message
  }
}
`;

export const VERIFY_SELLER_PHONE = gql`
mutation verifySellerPhone($sellerVerifyInput: SellerVerifyInput!) {
  verifySellerPhone(sellerVerifyInput: $sellerVerifyInput) {
    success
    message
  }
}
`;