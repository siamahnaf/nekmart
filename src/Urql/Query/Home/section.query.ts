import { gql } from "urql";

export const ADD_SECTION = gql`
mutation addSection($sectionInput: SectionInput!) {
    addSection(sectionInput: $sectionInput) {
      success
      message
    }
}
`;

export const GET_SECTIONS = gql`
query getSections {
    getSections {
      id
      name
      description
      base
      category {
        id
        name
      }
      publish
    }
}
`;

export const DELETE_SECTION = gql`
mutation deleteSection($deleteSectionId: String!) {
    deleteSection(id: $deleteSectionId) {
      success
      message
    }
}
`;

export const UPDATE_SECTION = gql`
mutation updateSection($sectionInput: SectionInput!, $updateSectionId: String!) {
    updateSection(sectionInput: $sectionInput, id: $updateSectionId) {
      success
      message
    }
}
`;