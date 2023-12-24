import { gql } from "urql";

export const GET_REVIEWS = gql`
query getReviewBySeller($searchInput: SearchInput!) {
  getReviewBySeller(searchInput: $searchInput) {
    results {
      id
      user {
        name
        phone
      }
      product {
        name
      }
      seller {
        shopName
      }
      image
      publish
      comment
      reply
      rating
      created_at
    }
    meta {
      totalPages
      currentPage
      itemCount
      itemsPerPage
      totalItems
    }
  }
}
`;

export const ADD_REPLY = gql`
mutation replyReview($replyInput: ReplyInput!) {
  replyReview(replyInput: $replyInput) {
    success
    message
  }
}
`;