import { gql } from "urql";

export const ADD_BANNER_TWO = gql`
mutation addBannerTwo($bannerInput: BannerInput!) {
    addBannerTwo(bannerInput: $bannerInput) {
      success
      message
    }
}
`;


export const GET_BANNER_TWO = gql`
query getBannerTwo {
    getBannerTwo {
      id
      name
      path
      url
    }
}
`;

export const DELETE_BANNER_TWO = gql`
mutation deleteBannerTwo($deleteBannerTwoId: String!) {
    deleteBannerTwo(id: $deleteBannerTwoId) {
      success
      message
    }
}
`;

export const UPDATE_BANNER_TWO = gql`
mutation updateBannerTwo($bannerInput: BannerInput!, $updateBannerTwoId: String!) {
    updateBannerTwo(bannerInput: $bannerInput, id: $updateBannerTwoId) {
      success
      message
    }
}
`;