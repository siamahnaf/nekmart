import { gql } from "urql";

export const GET_CAMPAIGN = gql`
query getFlashes($searchInput: SearchInput!) {
    getFlashes(searchInput: $searchInput) {
      results {
        id
        title
        thumb
        start
        expires
        discount
        discountUnit
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

export const GET_RUNNING_FLASH = gql`
query getRunningFlashes($searchInput: SearchInput!) {
  getRunningFlashes(searchInput: $searchInput) {
    results {
      id
      title
    }
  }
}
`;

export const UPDATE_FLASH_PRODUCT = gql`
mutation updateFlashProduct($updateFlashProductInput: UpdateFlashProductInput!) {
  updateFlashProduct(updateFlashProductInput: $updateFlashProductInput) {
    success
    message
  }
}
`;

export const GET_NO_FLASH_PRODUCT = gql`
query getNoFlashProduct($searchInput: SearchInput!, $sellerId: String!) {
  getNoFlashProduct(searchInput: $searchInput, sellerId: $sellerId) {
    results {
      id
      name
    }
  }
}
`;