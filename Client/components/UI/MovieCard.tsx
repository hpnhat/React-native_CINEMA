import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

interface MovieCardProps {
  title: string;
  genre: string[];
  imagePath: string;
  cardFunction: () => void;
}
const { width, height } = Dimensions.get("window");
const MovieCard = ({
  title,
  genre,
  imagePath,
  cardFunction, 
}: MovieCardProps) => {
  return (
    <TouchableOpacity onPress={() => cardFunction()}>
      <View className="relative">
        <Image
          src="https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg"
          className={`w-full  rounded-3xl mb-3 `}
          style={{ height: height * 0.4 }}
          resizeMode="center"
        />
        <View className="flex flex-row justify-center items-center absolute right-0 top-72 pr-1 pl-2 backdrop-blur-sm bg-black/30 rounded-l-3xl">
          <Text className="text-white pr-1">5</Text>
          <AntDesign name="star" size={10} color="#E1CD17" />
        </View>
        <View className="flex justify-center items-center">
          <Text className="text-white text-xl font-medium my-2 text-center">
            {title}
          </Text>
          <View className="flex flex-row gap-2">
            {genre.map((item: string, i: number) => (
              <View
                key={i}
                className="border-2 border-gray-600 px-2 py-1 rounded-full"
              >
                <Text className="text-white">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
