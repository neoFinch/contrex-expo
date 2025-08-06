import OfferCarousel from "@/components/home/OfferCarousel";
import { ThemedText } from "@/components/ThemedText";
import { STRAPI_URL } from "@/lib/constants";
import { gql, useQuery } from "@apollo/client";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const GET_HOME_QUERY = gql`
  query Pages($filters: PageFiltersInput) {
    pages(filters: $filters) {
      documentId
      slug
      title
      blocks {
        ... on ComponentSharedCard {
          cta
          description
          id
          image {
            url
          }
          link
          title
        }
      }
    }
  }
`;

const GET_CATEGORIES_QUERY = gql`
  query Category {
    categories {
      documentId
      name
      slug
      image {
        url
      }
    }
  }
`;

export default function HomeScreen() {
  const { loading, error, data } = useQuery(GET_HOME_QUERY, {
    variables: {
      filters: {
        slug: {
          eq: "home",
        },
      },
    },
  });

  const {
    loading: catLoading,
    error: catError,
    data: catData,
  } = useQuery(GET_CATEGORIES_QUERY, {
    variables: {
      filters: {
        slug: {
          eq: "home",
        },
      },
    },
  });

  if (loading)
    return (
      <ThemedText style={tw`text-center p-4 text-lg text-gray-600`}>
        Loading...
      </ThemedText>
    );
  if (error) return <ThemedText>Error: {error.message}</ThemedText>;

  console.log({ catData });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={tw`flex-1 p-4`}>
        <TextInput
          placeholder="Search Products..."
          style={tw`w-full rounded-2xl p-3 text-gray-400 border border-gray-300`}
        />

        <OfferCarousel />

        {/* categories section */}
        <View style={tw`mt-8 flex flex-row flex-wrap gap-2 mb-16`}>
          <View style={tw`w-full mb-4`}>
            <ThemedText
              style={[
                tw`text-gray-400 text-left uppercase`,
                { fontFamily: "Montserrat_500Medium" },
              ]}
            >
              Shop By Category
            </ThemedText>
          </View>
          <View style={tw`flex w-full flex-row  flex-wrap`}>
            {catData?.categories.map((category: any, index: number) => (
              <View
                style={tw`inline-block w-1/2 pr-2 font-[Inter]  `}
                key={index}
              >
                <Link
                  href={`/category/${category.slug}?id=${category.documentId}`}
                >
                  <Image
                    source={`${STRAPI_URL}` + category.image.url}
                    style={tw`w-full h-40 rounded-md`}
                  />
                  <ThemedText
                    key={index}
                    style={[
                      tw`text-lg font-bold text-gray-400`,
                      { fontFamily: "Montserrat_500Medium" },
                    ]}
                  >
                    {category.name}
                  </ThemedText>
                </Link>
              </View>
            ))}
            <View style={tw`w-1/2 mt-3`}>
              <TouchableOpacity
                style={tw`w-full flex items-center justify-center bg-stone-800 rounded-md h-[162px]`}
              >
                <ThemedText>View All</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
