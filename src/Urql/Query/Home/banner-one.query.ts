import { gql } from "urql";

export const ADD_BANNER_ONE = gql`
mutation addBannerOne($bannerInput: BannerInput!) {
    addBannerOne(bannerInput: $bannerInput) {
      success
      message
    }
}
`;

export const GET_BANNER_ONE = gql`
query getBannerOne {
    getBannerOne {
      id
      name
      url
      path
    }
}
`;

export const DELETE_BANNER_ONE = gql`
mutation deleteBannerOne($deleteBannerOneId: String!) {
    deleteBannerOne(id: $deleteBannerOneId) {
      success
      message
    }
}
`;

export const UPDATE_BANNER_ONE = gql`
mutation updateBannerOne($bannerInput: BannerInput!, $updateBannerOneId: String!) {
    updateBannerOne(bannerInput: $bannerInput, id: $updateBannerOneId) {
      success
      message
    }
}
`;