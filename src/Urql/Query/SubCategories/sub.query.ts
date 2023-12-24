import { gql } from "urql";

export const ADD_SUB_CATEGORY = gql`
mutation addSubCategory($subCategoryInput: SubCategoryInput!) {
    addSubCategory(subCategoryInput: $subCategoryInput) {
      success
      message
    }
}
`;

export const GET_SUB_CATEGORIES = gql`
query getSubCategories($searchInput: SearchInput!) {
    getSubCategories(searchInput: $searchInput) {
      results {
        id
        name
        category {
          id
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

export const DELETE_SUB_CATEGORY = gql`
mutation deleteSubCategory($deleteSubCategoryId: String!) {
    deleteSubCategory(id: $deleteSubCategoryId) {
      success
      message
    }
}
`;

export const GET_SINGLE_SUB_CATEGORY = gql`
query getSubCategory($getSubCategoryId: String!) {
    getSubCategory(id: $getSubCategoryId) {
      id
      name
      category {
        id
        name
      }
      image
    }
  }
  
`;

export const UPDATE_SUB_CATEGORY = gql`
mutation updateSubCategory($updateSubCategoryId: String!, $subCategoryInput: SubCategoryInput!) {
    updateSubCategory(id: $updateSubCategoryId, subCategoryInput: $subCategoryInput) {
      success
      message
    }
}
`;