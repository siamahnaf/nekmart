import { gql } from "urql";

export const ADMIN_LOGIN = gql`
mutation loginAdmin($loginInput: LoginInput!) {
    loginAdmin(loginInput: $loginInput) {
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