import { gql } from "urql";

export const GET_FLASH_PRODUCT = gql`
query getFlashProduct($searchInput: SearchInput!, $flashId: String!) {
    getFlashProduct(searchInput: $searchInput, flashId: $flashId) {
      results {
        id
        name
        images
        price
        discount
        discountUnit
        totalPrice
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
    seller {
      id
      shopName
    }
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
    totalPrice
  }
}
`;

export const GET_SELLING_PRODUCT = gql`
query getSellingProduct($getSellingProductId: String!) {
  getSellingProduct(id: $getSellingProductId) {
    id
    name
    price
    images
    totalPrice
    discount
    discountUnit
  }
}
`;

export const GET_PRODUCT_BY_SELLER = gql`
query getProductBySeller(
  $searchInput: SearchInput!
  $getProductBySellerId: String!
) {
  getProductBySeller(searchInput: $searchInput, id: $getProductBySellerId) {
    results {
      id
      images
      name
      price
      discount
      discountUnit
      totalPrice
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