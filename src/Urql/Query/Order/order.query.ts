import { gql } from "urql";

export const GET_ORDERS = gql`
query getOrdersBySeller($searchInput: SearchInput!) {
    getOrdersBySeller(searchInput: $searchInput) {
      results {
        id
        order {
          orderId
          shippingAddress {
            name
          }
        }
        price
        status
        created_at
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

export const GET_SINGLE_ORDER = gql`
query getSingleOrderBySeller($orderSellerId: String!) {
  getSingleOrderBySeller(orderSellerId: $orderSellerId) {
    id
    order {
      orderId
      estimateDelivery
    }
    price
    products {
      productId {
        name
        images
      }
      quantity
      amount
      tax
      variation {
        id
        name
        variant
      }
    }
    status
  }
}
`;