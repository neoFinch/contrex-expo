import { ThemedText } from "@/components/ThemedText";
import { STRAPI_URL } from "@/lib/constants";
import { gql, useQuery } from "@apollo/client";
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const CATEGORY_QUERY = gql`
  query Category($documentId: ID!) {
    category(documentId: $documentId) {
      createdAt
      name
      products {
        documentId
        title
        slug
        price
        images {
          url
        }
      }
    }
  }
`;

export default function Category() {
  const { slug, id } = useLocalSearchParams();
  
  const handleAddToCart = (e: any, product: any) => {
    e.stopPropagation()
    e.preventDefault()
    console.log('product', product)
  }

  let { data, loading, error } = useQuery(CATEGORY_QUERY, {
    variables: {
      documentId: id,
    },
  });

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>Error: {error.message}</ThemedText>;
  

  return (
    <>
      <Stack.Screen options={{ title: `${data.category.name}` }} />
      <View style={tw`pt-16 p-4 text-gray-700`}>
        {/* <ThemedText>{JSON.stringify(data)}</ThemedText> */}
        <View style={tw`flex flex-row flex-wrap gap`}>
          {data?.category?.products.length === 0 && (
            <ThemedText
              style={tw`text-center w-full p-4 text-lg text-gray-600`}
            >
              No Products Found
            </ThemedText>
          )}
          {data?.category?.products.map((product: any, index: number) => (
            <TouchableOpacity style={tw`w-1/2 p-2`} key={index}>
              <Link href={`/product/${product.slug}?id=${product.documentId}`}>
              <View
                style={tw`flex items-center flex-grow rounded-md overflow-hidden`}
                
              >
                <Image
                  source={
                    `${STRAPI_URL}` +
                    product.images[0].url
                  }
                  style={tw`w-full h-40 rounded-md`}
                />
                <ThemedText key={index} style={tw`text-sm text-left py-2 w-full px-2`}>
                  {product.title.substring(0, 20)}
                </ThemedText>
                <ThemedText key={index} style={tw`text-xs text-left py-2 w-full px-2`}>
                  INR {product.price}
                </ThemedText>
                <TouchableOpacity style={tw`w-full`} key={index} onPress={(e) => handleAddToCart(e, product)}>
                <Text style={tw`text-sm text-center py-2 w-full bg-teal-500 rounded-md`}>Add to Cart</Text>
                  </TouchableOpacity>
              </View>
              </Link>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}
