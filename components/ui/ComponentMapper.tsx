import { View } from "react-native";
import tw from "twrnc";
import CollapsibleView from "./CollapsibleView";
export default function ComponentMapper({ content }: { content: any }) {
  return <View>{content.map((block: any, index: number) => {

    switch (block.__typename) {
      case 'ComponentSharedAccordionWrapper':
        return (
          block.accordionItem.map((item: any, index: number) => (
            <View key={index} style={tw`w-full p-2`}>
              <CollapsibleView title={item.title}>
                {item.description}
              </CollapsibleView>
            </View>
          ))
        )
      default:
        break;

    }

  })}</View>;
}
