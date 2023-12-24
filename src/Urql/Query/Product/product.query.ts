import { gql } from "urql";

export const GET_UNAPPROVED_PRODUCTS = gql`
query getUnapprovedProduct($searchInput: SearchInput!) {
  getUnapprovedProduct(searchInput: $searchInput) {
    results {
      id
      name
      images
      main_category {
        name
      }
      brand {
        name
      }
      quantity
      price
      is_approved
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

export const GET_SINGLE_PRODUCT = gql`
query getProduct($getProductId: String!) {
  getProduct(id: $getProductId) {
    id
    name
    images
    main_category {
      name
    }
    category {
      name
    }
    sub_category {
      name
    }
    brand {
      name
    }
    unit
    minPurchase
    tag {
      name
    }
    refundAble
    price
    quantity
    discount
    discountUnit
    tax
    taxUnit
    attributes {
      attributes {
        variant
        price
        quantity
        image
      }
    }
    seller {
      shopName
      phone
      address
    }
    description
    youtubeLink
    meta {
      title
      description
      metaTags
      image
    }
    visibility
    showStock
    is_approved
    disclaimer
  }
}
`;

export const APPROVED_PRODUCT = gql`
mutation approvedProduct($approvedProductId: String!, $approved: Boolean!) {
  approvedProduct(id: $approvedProductId, approved: $approved) {
    success
    message
  }
}
`;