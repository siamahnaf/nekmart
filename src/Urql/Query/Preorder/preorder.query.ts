import { gql } from "urql";

export const ADD_PRE_ORDER = gql`
mutation addPreorder($preorderInput: PreorderInput!) {
    addPreorder(preorderInput: $preorderInput) {
      success
      message
    }
}
`;