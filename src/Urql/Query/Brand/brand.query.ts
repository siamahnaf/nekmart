import { gql } from "urql";

export const GET_BRANDS = gql`
query getBrands($searchInput: SearchInput!) {
    getBrands(searchInput: $searchInput) {
      results {
        id
        name
        image
      }
    }
}  
`;