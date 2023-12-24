import { gql } from "urql";

export const GET_CATEGORIES = gql`
query getMainCategories($searchInput: SearchInput!) {
  getMainCategories(searchInput: $searchInput) {
    results {
      id
      name
      image
      category {
        id
        name
        image
        sub_category {
          id
          name
          image
        }
      }
    }
  }
}
`;