import { gql } from "urql";

export const ADD_CATEGORY = gql`
mutation addCategory($categoryInput: CategoryInput!) {
    addCategory(categoryInput: $categoryInput) {
      success
      message
    }
}
`;

export const GET_CATEGORIES = gql`
query getCategories($searchInput: SearchInput!) {
  getCategories(searchInput: $searchInput) {
    results {
      id
      name
      main_category {
        name
      }
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

export const DELETE_CATEGORY = gql`
mutation deleteCategory($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId) {
    success
    message
  }
}
`;

export const GET_SINGLE_CATEGORY = gql`
query getCategory($getCategoryId: String!) {
  getCategory(id: $getCategoryId) {
    id
    name
    main_category {
      name
      id
    }
    image
  }
}
`;

export const UPDATE_CATEGORY = gql`
mutation updateCategory($categoryInput: CategoryInput!, $updateCategoryId: String!) {
  updateCategory(categoryInput: $categoryInput, id: $updateCategoryId) {
    success
    message
  }
}
`;