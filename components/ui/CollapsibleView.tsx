import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import tw from "twrnc";
import { IconSymbol } from "./IconSymbol";

const CollapsibleView = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={tw`flex flex-col`}>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <View style={tw` flex justify-between flex-row`}>
          <Text style={tw`text-lg font-bold text-stone-500`}>{title}</Text>
          {collapsed ? (
            <IconSymbol
              name="chevron.right"
              size={24}
              color="#808080"
              style={tw`rotate-90`}
            />
          ) : (
            <IconSymbol
              name="chevron.right"
              size={24}
              color="#808080"
              style={tw`rotate-270 translate-y-1`}
            />
          )}
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={[tw`p-4 bg-stone-800 text-white text-sm`, {fontFamily: 'SpaceMono'}]}>{children}</View>
      </Collapsible>
    </View>
  );
};

export default CollapsibleView;
