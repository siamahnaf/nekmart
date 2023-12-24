import { gql } from "urql";

export const CHECK_REVIEW = gql`
query reviewAvailability($checkReviewInput: CheckReviewInput!) {
  reviewAvailability(checkReviewInput: $checkReviewInput) {
    success
    message
  }
}
`;

export const ADD_REVIEWS = gql`
mutation addReviews($reviewInput: ReviewInput!) {
  addReviews(reviewInput: $reviewInput) {
    success
    message
  }
}
`;

export const GET_REVIEWS = gql`
query getReviewByProduct($productId: String!) {
  getReviewByProduct(productId: $productId) {
    id
    image
    comment
    rating
    reply
    seller {
      shopName
    }
    user {
      name
      phone
    }
    created_at
  }
}
`;