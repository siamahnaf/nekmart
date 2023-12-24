import { gql } from "urql";

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