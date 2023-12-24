import { gql } from "urql";

export const APPLY_COUPON = gql`
mutation applyCoupon($applyInput: ApplyInput!) {
  applyCoupon(applyInput: $applyInput) {
    success
    message
    discount
  }
}
`;

export const GET_ADDRESS = gql`
query getAddress {
  getAddress {
    id
    name
    phone
    gender
    address
    country
    city
    area
    postal
    default
  }
}
`;

export const ADD_ADDRESS = gql`
mutation addAddress($addressInput: AddressInput!) {
  addAddress(addressInput: $addressInput) {
    success
    message
  }
}
`;

export const UPDATE_ADDRESS = gql`
mutation updateAddress($addressInput: AddressInput!, $updateAddressId: String!) {
  updateAddress(addressInput: $addressInput, id: $updateAddressId) {
    success
    message
  }
}
`;

export const MARK_AS_DEFAULT = gql`
mutation markAddDefault($markAddDefaultId: String!) {
  markAddDefault(id: $markAddDefaultId) {
    success
    message
  }
}
`;

export const DELETE_ADDRESS = gql`
mutation deleteAddress($deleteAddressId: String!) {
  deleteAddress(id: $deleteAddressId) {
    success
    message
  }
}
`

export const GET_SHIPPING = gql`
query getActiveShipping {
  getActiveShipping {
    id
    rateInSavar
    rateInsideDhaka
    rateOutsideDhaka
    estimateDelivery
  }
}
`;