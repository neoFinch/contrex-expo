import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import tw from "twrnc";

export default function MyOrder() {
  return (
    <ScrollView style={tw`flex-1 p-4`}>
      <ThemedText type="title" style={tw`text-gray-800`}>Profile Screen</ThemedText>
    </ScrollView>
  )
}