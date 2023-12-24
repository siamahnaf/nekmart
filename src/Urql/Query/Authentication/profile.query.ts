import { gql } from "urql";

export const GET_SELLER_PROFILE = gql`
query getSellerProfile {
    getSellerProfile {
      id
      shopName
      user {
        name
      }
      phone
      logo
      banner
      address
      metaTitle
      metaDescription
      is_verified
      is_banned
      bank {
        name
        accNumber
        routing
        bankName
        branch
      }
    }
}  
`;

export const UPDATE_SELLER = gql`
mutation updateSeller($updateSellerInput: UpdateSellerInput!, $updateSellerId: String!) {
  updateSeller(updateSellerInput: $updateSellerInput, id: $updateSellerId) {
    success
    message
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