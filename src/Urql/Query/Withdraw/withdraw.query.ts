import { gql } from "urql";

export const GET_INCOME_STATISTIC = gql`
query getIncomeStatics($sellerId: String!) {
    getIncomeStatics(sellerId: $sellerId) {
      currentIncomes {
        id
        income
      }
      upcomingIncomes {
        id
        income
      }
      lastPaymentDate
    }
}  
`;


export const GET_PREVIOUS_WITHDRAW = gql`
query getWithdraw($sellerId: String!, $searchInput: SearchInput!) {
    getWithdrawalByAdmin(sellerId: $sellerId, searchInput: $searchInput) {
      results {
        id
        amount
        method
        releasedBy {
          name
          phone
        }
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

export const RELEASE_PAYMENT = gql`
mutation releasePayment($paymentInput: ReleasePaymentInput!) {
    releasePayment(paymentInput: $paymentInput) {
      success
      message
    }
}
`;