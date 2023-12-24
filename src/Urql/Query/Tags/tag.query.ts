import { gql } from "urql";

export const GET_TAGS = gql`
query getTags($searchInput: SearchInput!) {
    getTags(searchInput: $searchInput) {
      results {
        id
        name
      }
    }
}
`;