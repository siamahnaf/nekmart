import { gql } from "urql";

export const ADD_PRODUCT = gql`
mutation addProducts($productInput: ProductInput!) {
    addProduct(productInput: $productInput) {
      success
      message
    }
}  
`;

export const GET_OWN_PRODUCTS = gql`
query getOwnProducts($searchInput: SearchInput!) {
  getOwnSellerProducts(searchInput: $searchInput) {
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
      visibility
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

export const DELETE_PRODUCT = gql`
mutation deleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId) {
    success
    message
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
      id
      name
    }
    category {
      id
      name
    }
    sub_category {
      id
      name
    }
    brand {
      id
      name
    }
    unit
    minPurchase
    tag {
      id
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
      attributeIds {
        id
        name
      }
      selectedVariant {
        id
        selected
      }
      attributes {
        variant
        price
        quantity
        image
      }
    }
    description
    youtubeLink
    meta {
      title
      description
      metaTags
      image
    }
    estimateDelivery
    warranty
    flash {
      id
      title
    }
    visibility
    showStock
    is_approved
    disclaimer
    specification {
      title
      value
    }
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation updateProduct($productInput: ProductInput!, $updateProductId: String!) {
  updateProduct(productInput: $productInput, id: $updateProductId) {
    success
    message
  }
}
`;