import { gql } from "urql";

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

export const GET_SECTIONS = gql`
query getSectionProduct {
  getSectionProducts {
    section {
      name
      description
      base
      category {
        name
        id
      }
    }
    products {
      id
      name
      images
      price
      discount
      discountUnit
      totalPrice
    }
  }
}
`;