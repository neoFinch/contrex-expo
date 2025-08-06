import { gql } from "@apollo/client";

export const GET_OFFERS_QUERY = gql`
  query Offers {
  offers {
    heading
    subheading
    offerImage {
      url
    }
    slug
  }
}
`