import { gql } from "urql";

export const GET_ATTRIBUTES = gql`
query getAttributes($searchInput: SearchInput!) {
    getAttributes(searchInput: $searchInput) {
      results {
        id
        name
        values {
          value
          meta
        }
      }
    }
}  
`;