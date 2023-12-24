import { gql } from "urql";

export const GET_PROFILE = gql`
query getProfile {
    getProfile {
      id
      name
      phone
      email
      avatar
    }
}
`;

export const UPDATE_PROFILE = gql`
mutation updateProfile($updateUserInput: UpdateUserInput!) {
    updateProfile(updateUserInput: $updateUserInput) {
      success
      message
    }
}
`;

export const UPDATE_PASSWORD = gql`
mutation changePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput) {
      success
      message
    }
}
`;