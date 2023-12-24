import { gql } from "urql";

export const ADD_FLASH_SALE = gql`
mutation addFlash($flashInput: FlashInput!) {
    addFlash(flashInput: $flashInput) {
      success
      message
    }
}  
`;

export const GET_FLASHES = gql`
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

export const DELETE_FLASH = gql`
mutation deleteFlash($deleteFlashId: String!) {
    deleteFlash(id: $deleteFlashId) {
      success
      message
    }
}  
`;

export const GET_SINGLE_FLASH = gql`
query getFlash($getFlashId: String!) {
    getFlash(id: $getFlashId) {
      id
      title
      image
      thumb
      start
      expires
      discount
      discountUnit
    }
}  
`;

export const UPDATE_FLASH = gql`
mutation updateFlash($flashInput: FlashInput!, $updateFlashId: String!) {
    updateFlash(flashInput: $flashInput, id: $updateFlashId) {
      success
      message
    }
}
`;