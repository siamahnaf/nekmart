import { gql } from "urql";

export const GET_RUNNING_FLASH = gql`
query getRunningFlashes($searchInput: SearchInput!) {
    getRunningFlashes(searchInput: $searchInput) {
      results {
        id
        title
        image
        thumb
      }
    }
}  
`;

export const GET_SINGLE_FLASH = gql`
query getFlash($getFlashId: String!) {
  getFlash(id: $getFlashId) {
    id
    title
    image
    start
    expires
  }
}
`;