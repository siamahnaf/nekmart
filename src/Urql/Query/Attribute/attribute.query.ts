import { gql } from "urql";

export const ADD_ATTRIBUTE = gql`
mutation addAttribute($attributeInput: AttributeInput!) {
    addAttribute(attributeInput: $attributeInput) {
      success
      message
    }
}  
`;

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

export const DELETE_ATTRIBUTE = gql`
mutation deleteAttribute($deleteAttributeId: String!) {
    deleteAttribute(id: $deleteAttributeId) {
      success
      message
    }
}
`;

export const GET_SINGLE_ATTRIBUTE = gql`
query getAttribute($getAttributeId: String!) {
    getAttribute(id: $getAttributeId) {
      id
      name
      values {
        value
        meta
      }
    }
}
`;

export const UPDATE_ATTRIBUTE = gql`
mutation updateAttribute($attributeInput: AttributeInput!, $updateAttributeId: String!) {
    updateAttribute(attributeInput: $attributeInput, id: $updateAttributeId) {
      success
      message
    }
}  
`;