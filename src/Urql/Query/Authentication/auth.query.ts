import { gql } from "urql";

export const SELLER_LOGIN = gql`
mutation sellerLogin($loginInput: LoginInput!) {
    loginSeller(loginInput: $loginInput) {
      success
      message
    }
}
`;

export const GET_PROFILE = gql`
query getProfile {
    getProfile {
      id
      name
      phone
      email
      avatar
      is_verified
      role
    }
}
`;