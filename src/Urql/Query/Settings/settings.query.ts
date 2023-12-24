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