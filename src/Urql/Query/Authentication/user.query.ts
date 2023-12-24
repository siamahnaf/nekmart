import { gql } from "urql";

export const GET_USERS = gql`
query getUsers($searchInput: SearchInput!) {
    getUsers(searchInput: $searchInput) {
      results {
        id
        name
        phone
        email
        avatar
        provider {
          id
          name
        }
        is_verified
        is_banned
      }
      meta {
        itemCount
        totalItems
        itemsPerPage
        totalPages
        currentPage
      }
    }
}  
`;

export const BAN_OR_UNBANNED_USER = gql`
mutation banOrUnbannedUser($banOrUnbannedUserId: String!, $status: Boolean!) {
    banOrUnbannedUser(id: $banOrUnbannedUserId, status: $status) {
      success
      message
    }
  }
  
`;

export const ADD_ADMIN = gql`
mutation addAdmin($adminInput: AdminInput!) {
  addAdmins(adminInput: $adminInput) {
    success
    message
  }
}
`;

export const GET_ADMINS = gql`
query getAdmin($searchInput: SearchInput!) {
  getAdmins(searchInput: $searchInput) {
    results {
      id
      name
      phone
      email
      avatar
      role
    }
    meta {
      itemCount
      totalItems
      itemsPerPage
      totalPages
      currentPage
    }
  }
}
`

export const DELETE_ADMIN = gql`
mutation removeAdmin($removeAdminId: String!) {
  removeAdmin(id: $removeAdminId) {
    success
    message
  }
}
`;