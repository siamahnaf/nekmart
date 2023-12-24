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


export const GET_INCOME_HISTORY = gql`
query getIncomeHistory($searchInput: SearchInput!) {
  getIncomeHistory(searchInput: $searchInput) {
    results {
      id
      orderId {
        orderId
      }
      income
      paySuccess
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

export const CONFIRM_PAYMENT = gql`
mutation confirmPayment($withdrawId: String!) {
  confirmPayment(withdrawId: $withdrawId) {
    success
    message
  }
}
`;

export const GET_PROCESSING_PAYMENT = gql`
query getProcessingWithdraw {
  getProcessingWithdraw {
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
}
`;

export const ADD_BANK_INFORMATION = gql`
mutation addBankInformation($bankInput: BankInput!) {
  addBankInformation(bankInput: $bankInput) {
    success
    message
  }
}
`;

export const GET_PREVIOUS_WITHDRAW = gql`
query getWithdrawBySeller($searchInput: SearchInput!) {
  getWithdrawalBySeller(searchInput: $searchInput) {
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

export const GET_PROCESSING_WITHDRAW = gql`
query getProcessingWithdraw {
  getProcessingWithdraw {
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
}
`;

export const ACCEPT_PAYMENT = gql`
mutation confirmPayment($withdrawId: String!) {
  confirmPayment(withdrawId: $withdrawId) {
    success
    message
  }
}
`;