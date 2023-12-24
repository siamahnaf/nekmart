import { gql } from "urql";

export const ADD_SHIPPING = gql`
mutation addShipping($shippingInput: ShippingInput!) {
    addShipping(shippingInput: $shippingInput) {
      success
      message
    }
}
`;

export const GET_SHIPPINGS = gql`
query getShippings($searchInput: SearchInput!) {
    getShippings(searchInput: $searchInput) {
      results {
        id
        name
        rateInSavar
        rateInsideDhaka
        rateOutsideDhaka
        estimateDelivery
        active
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

export const DELETE_SHIPPINGS = gql`
mutation deleteShipping($deleteShippingId: String!) {
    deleteShipping(id: $deleteShippingId) {
      success
      message
    }
}
`;

export const CHANGE_ACTIVE_STATUS = gql`
mutation setShippingAsActive($setShippingAsActiveId: String!) {
  setShippingAsActive(id: $setShippingAsActiveId) {
    success
    message
  }
}
`;

export const GET_SINGLE_SHIPPING = gql`
query getShipping($getShippingId: String!) {
  getShipping(id: $getShippingId) {
    id
    name
    rateInSavar
    rateInsideDhaka
    rateOutsideDhaka
    estimateDelivery
    description
  }
}
`;

export const UPDATE_SHIPPINGS = gql`
mutation updateShipping($shippingInput: ShippingInput!, $updateShippingId: String!) {
  updateShipping(shippingInput: $shippingInput, id: $updateShippingId) {
    success
    message
  }
}
`;