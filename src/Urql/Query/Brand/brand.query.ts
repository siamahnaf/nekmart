import { gql } from "urql";

export const ADD_BRAND = gql`
mutation addBrand($brandInput: BrandInput!) {
    addBrand(brandInput: $brandInput) {
      success
      message
    }
}
`;

export const GET_BRANDS = gql`
query getBrands($searchInput: SearchInput!) {
  getBrands(searchInput: $searchInput) {
    results {
      id
      name
      image
      description
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
`;

export const DELETE_BRAND = gql`
mutation deleteBrand($deleteBrandId: String!) {
  deleteBrand(id: $deleteBrandId) {
    success
    message
  }
}
`;

export const GET_SINGLE_BRAND = gql`
query getBrand($getBrandId: String!) {
  getBrand(id: $getBrandId) {
    id
    name
    image
    description
  }
}
`;

export const UPDATE_BRAND = gql`
mutation updateBrand($updateBrandId: String!, $brandInput: BrandInput!) {
  updateBrand(id: $updateBrandId, brandInput: $brandInput) {
    success
    message
  }
}
`;