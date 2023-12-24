import { gql } from "urql";

export const GET_BRAND = gql`
query getBrands($searchInput: SearchInput!) {
    getBrands(searchInput: $searchInput) {
      results {
        id
        name
      }
    }
}
`;