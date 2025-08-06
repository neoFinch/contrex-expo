import { ThemedText } from "@/components/ThemedText";
import ComponentMapper from "@/components/ui/ComponentMapper";
import CustomCarousel from "@/components/ui/CustomCarousel";
import RichTextRenderer from "@/components/ui/RichTextRenderer";
import { gql, useQuery } from "@apollo/client";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import tw from "twrnc";

const PRODUCT_QUERY = gql`
  query Product($documentId: ID!) {
    product(documentId: $documentId) {
      documentId
      title
      images {
        url
      }
      description
      blocks {
      ...on ComponentSharedAccordionWrapper{
        accordionItem {
          title
          description
        }
      }
    }
    }
  }
`;

export default function Product() {
  const { slug, id } = useLocalSearchParams();
  let { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: {
      documentId: id,
    },
  });

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>Error: {error.message}</ThemedText>;

  console.log({ productData: data });

  const sanitizedImages = data?.product.images.map((image: any) => {
    console.log({ image });
    return {
      ...image,
      image: {
        url: image.url,
      },
    };
  });

  console.log({ sanitizedImages });

  return (
    <>
      <Stack.Screen
        options={{ title: `${data.product.title.substring(0, 20)}` }}
      />

      <ScrollView style={tw`pt-16 p-4 text-gray-700`}>
        <CustomCarousel items={sanitizedImages} />
        <ThemedText style={tw` py-4 text-stone-400`}>
          {data?.product.title}
        </ThemedText>
        <RichTextRenderer content={data?.product.description} />
        {
          data?.product.blocks.map((block: any, index: number) => (
            <RichTextRenderer content={block.accordionItem.description} />
          ))  
        }

        <ComponentMapper content={data?.product.blocks} />
      </ScrollView>
    </>
  );
}
