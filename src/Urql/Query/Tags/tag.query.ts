import { gql } from "urql";

export const CREATE_TAG = gql`
mutation addTag($tagInput: TagInput!) {
    addTag(tagInput: $tagInput) {
      success
      message
    }
}
`;

export const GET_TAGS = gql`
query getTags($searchInput: SearchInput!) {
  getTags(searchInput: $searchInput) {
    results {
      id
      name
      description
      created_at
      updated_at
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

export const DELETE_TAG = gql`
mutation deleteTag($deleteTagId: String!) {
  deleteTag(id: $deleteTagId) {
    success
    message
  }
}
`;

export const GET_SINGLE_TAG = gql`
query getTag($getTagId: String!) {
  getTag(id: $getTagId) {
    id
    name
    description
  }
}
`;

export const UPDATE_TAG = gql`
mutation updateTag($updateTagId: String!, $tagInput: TagInput!) {
  updateTag(id: $updateTagId, tagInput: $tagInput) {
    success
    message
  }
}
`;