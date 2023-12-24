import { gql } from "urql";

export const GET_ORDERS = gql`
query getOrders($searchInput: SearchInput!) {
  getOrders(searchInput: $searchInput) {
    results {
      id
      orderId
      subtotal
      paymentStatus
      user {
        name
      }
      created_at
      payment {
        paymentMethod
      }
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
query getOrder($getOrderId: String!) {
  getOrder(id: $getOrderId) {
    id
    orderId
    sellers {
      id
      sellerId {
        shopName
      }
      products {
        productId {
          images
          name
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
      price
    }
    total
    shippingCount
    shippingFees
    couponDiscount
    subtotal
    note
    user {
      name
      phone
    }
    shippingAddress {
      name
      phone
      gender
      address
      city
      area
      country
      postal
    }
    billingAddress {
      name
      phone
      gender
      address
      city
      area
      country
      postal
    }
    payment {
      paymentMethod
      paymentId
      provider
    }
  }
}
`;

export const UPDATE_ORDER_NOTE = gql`
mutation orderNote($orderNoteId: String!, $note: String!) {
  orderNote(id: $orderNoteId, note: $note) {
    success
    message
  }
}
`;

export const CHANGE_ORDER_STATUS = gql`
mutation changeOrderStatus($orderSellerId: String!, $status: String!) {
  changeOrderStatus(orderSellerId: $orderSellerId, status: $status) {
    success
    message
  }
}
`;

export const CANCEL_ORDER = gql`
mutation cancelOrder($orderSellerId: String!) {
  cancelOrderStatusByAdmin(orderSellerId: $orderSellerId) {
    success
    message
  }
}
`;