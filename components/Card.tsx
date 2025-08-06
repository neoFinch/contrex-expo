import { Image, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { ThemedView } from "./ThemedView";

interface CardProps {
  title?: string;
  description?: string;
  image?: string | { uri: string };
  cta?: string;
  onPress?: () => void;
  style?: object;
  imageStyle?: object;
  titleStyle?: object;
  descriptionStyle?: object;
  ctaStyle?: object;
}

export const Card = ({
  title,
  description,
  image,
  cta,
  onPress,
  style,
  imageStyle,
  titleStyle,
  descriptionStyle,
  ctaStyle,
}: CardProps) => {
  return (
    <ThemedView style={[tw`bg-white rounded-lg shadow-md overflow-hidden`, style]}>
      {/* Image Section */}
      {image && (
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={[tw`w-full h-48`, imageStyle]}
          resizeMode="cover"
        />
      )}

      {/* Content Section */}
      <ThemedView style={tw`p-4`}>
        {/* Title */}
        {title && (
          <Text style={[tw`text-lg font-bold text-gray-900 mb-2`, titleStyle]}>
            {title}
          </Text>
        )}

        {/* Description */}
        {description && (
          <Text
            style={[tw`text-gray-600 text-sm leading-5 mb-4`, descriptionStyle]}
          >
            {description}
          </Text>
        )}

        {/* CTA Button */}
        {cta && (
          <TouchableOpacity
            onPress={onPress}
            style={[tw`bg-blue-500 py-3 px-4 rounded-md self-start`, ctaStyle]}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white font-medium text-sm`}>{cta}</Text>
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
};
