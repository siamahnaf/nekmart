import { gql } from "urql";

export const GET_MAIN_CATEGORY = gql`
query getMainCategories($searchInput: SearchInput!) {
    getMainCategories(searchInput: $searchInput) {
      results {
        id
        name
      }
    }
}  
`;

export const GET_CATEGORY = gql`
query getCategories($searchInput: SearchInput!) {
    getCategories(searchInput: $searchInput) {
      results {
        id
        name
      }
    }
}  
`;

export const GET_SUB_CATEGORY = gql`
query getSubCategories($searchInput: SearchInput!) {
    getSubCategories(searchInput: $searchInput) {
      results {
        id
        name
      }
    }
}  
`;