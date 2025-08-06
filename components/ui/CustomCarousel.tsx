import { STRAPI_URL } from "@/lib/constants";
import { Image } from "expo-image";
import { useRef } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import tw from "twrnc";

// const data = [...new Array(2).keys()];
const width = Dimensions.get("window").width;

export default function CustomCarousel({items}: {items: any}) {
  console.log('custom carousel items', items)
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={tw`flex mt-4  overflow-hidden`}>
      <Carousel
        ref={ref}
        width={width - 32}
        height={width / 2}
        data={items}
        onProgressChange={progress}
        renderItem={({ index, item }) => {
          return (
          <View
            style={tw`w-full h-full bg-gray-900 rounded-lg overflow-hidden`}
          >
            {/* <Text style={tw`text-center text-white`}>{index}</Text> */}
            <Image 
              source={`${STRAPI_URL}` + item.image.url} 
              style={tw`w-full h-full aspect-square`}
            />
          </View>
        )}}
      />

      <Pagination.Basic
        progress={progress}
        data={items}
        dotStyle={{ backgroundColor: "rgba(128, 186, 86, 0.72)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}
