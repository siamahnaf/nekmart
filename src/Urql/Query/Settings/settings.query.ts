import { gql } from "urql";

export const GET_SETTINGS = gql`
query getSettings {
    getSiteSettings {
      id
      logo
      icon
      siteTitle
      slogan
      metaTitle
      metaDescription
      metaTag
      siteUrl
      ogTitle
      ogDescription
      ogImage
      email
      phone
      corporateOffice
      headOffice
      facebook
      instagram
      youtube
      twitter
      linkedIn
    }
}
`;

export const ADD_SETTINGS = gql`
mutation addSettings($siteInput: SettingsInput!) {
    addSettings(siteInput: $siteInput) {
      success
      message
    }
}  
`;