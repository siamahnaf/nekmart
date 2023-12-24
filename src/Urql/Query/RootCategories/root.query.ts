import { gql } from "urql";

export const ADD_ROOT_CATEGORY = gql`
mutation addMainCategory($mainCategoryInput: MainCategoryInput!) {
    addMainCategory(mainCategoryInput: $mainCategoryInput) {
      success
      message
    }
}
`;

export const GET_MAIN_CATEGORIES = gql`
query getMainCategories($searchInput: SearchInput!) {
    getMainCategories(searchInput: $searchInput) {
      results {
        id
        name
        image
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

export const DELETE_MAIN_CATEGORIES = gql`
mutation deleteMainCategories($deleteMainCategoryId: String!) {
    deleteMainCategory(id: $deleteMainCategoryId) {
      success
      message
    }
}
`;

export const GET_SINGLE_MAIN_CATEGORY = gql`
query getMainCategory($getMainCategoryId: String!) {
    getMainCategory(id: $getMainCategoryId) {
      id
      name
      description
      image
    }
}  
`;

export const UPDATE_MAIN_CATEGORY = gql`
mutation updateMainCategory($mainCategoryInput: MainCategoryInput!, $updateMainCategoryId: String!) {
    updateMainCategory(mainCategoryInput: $mainCategoryInput, id: $updateMainCategoryId) {
      success
      message
    }
}
`;