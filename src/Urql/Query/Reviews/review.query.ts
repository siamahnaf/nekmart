import { gql } from "urql";

export const GET_REVIEWS = gql`
query getReviewByAdmin($searchInput: SearchInput!) {
    getReviewByAdmin(searchInput: $searchInput) {
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


export const CHANGE_REVIEW_VISIBILITY = gql`
mutation changeReviewVisibility($reviewId: String!) {
    changeReviewVisibility(reviewId: $reviewId) {
      success
      message
    }
}
`;