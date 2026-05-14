import React from 'react'
import { Text, View } from "react-native";

export const Header = () => {
  return (
    <View className="mt-5">
        <Text className="text-white text-7xl font-semibold">
          Todo
          <Text className="text-purple-500 font-extrabold"> App</Text>
        </Text>
        <Text className="text-gray-300/70 text-xl font-semibold mt-2">
          A simple todo app built with MERN stack and React Native.
        </Text>
      </View>
  )
}
