import { gql } from "urql";

export const GET_PLATFORM = gql`
query getPlatform {
    getPlatform {
      charge
    }
}
`;

export const ADD_PLATFORM = gql`
mutation addPlatform($platformInput: PlatformInput!) {
    addPlatform(platformInput: $platformInput) {
      success
      message
    }
}
`;