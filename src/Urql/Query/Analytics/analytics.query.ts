import { gql } from "urql";

export const GET_ANALYTICS = gql`
query getAnalyticsByUser {
    getAnalyticsByUser {
      totalCart
      totalWishlist
      totalOrder
      defaultAddress {
        name
        phone
        gender
        address
        city
        area
        country
      }
    }
}  
`;