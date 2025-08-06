import CustomCarousel from "@/components/ui/CustomCarousel";
import { GET_OFFERS_QUERY } from "@/utils/gql-queries";
import { useQuery } from "@apollo/client";
import { View } from "react-native";

export default function OfferCarousel() {
  console.log("OfferCarousel");
  const { loading, error, data } = useQuery(GET_OFFERS_QUERY)
  console.log({loading, error, data});
  if (loading) return <View>Loading...</View>;

  console.log({offers: data?.offers});

  const sanitizedOffers = data?.offers.map((offer: any) => {
    return {
      ...offer,
      image: {
        url: offer.offerImage.url,
      },
    };
  });

  console.log({sanitizedOffers});
  
  return <View><CustomCarousel items={sanitizedOffers} /></View>;
}