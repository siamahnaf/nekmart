import { gql } from "urql";

export const GET_PRE_ORDER = gql`
query getPreorder($searchInput: SearchInput!) {
    getPreorder(searchInput: $searchInput) {
      results {
        id
        firstName
        lastName
        phone
        address
        email
        productImage
        productUrl
        created_at
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

export const DELETE_PRE_ORDER = gql`
mutation deletePreorder($deletePreorderId: String!) {
  deletePreorder(id: $deletePreorderId) {
    success
    message
  }
}
`;