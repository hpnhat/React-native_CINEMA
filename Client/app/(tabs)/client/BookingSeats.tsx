import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useNavigation } from "expo-router";
import { Film, filmData } from "@/data";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
type MovieDetailRouteParams = {
  id: string;
};

type MovieDetailRouteProp = RouteProp<
  { params: MovieDetailRouteParams },
  "params"
>;
const BookingSeats = () => {
  const navigation: any = useNavigation();
  const route = useRoute<MovieDetailRouteProp>();

  const { id } = route.params;
  const movie = filmData.find((value: Film) => value.id === id);
  console.log(movie);
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-full bg-primary"
      >
        <View className="relative">
          <View className="absolute w-full h-full drop-shadow-lg">
            <Svg viewBox="0 10 100 50">
              <Path
                d="M 10 25 Q 50 10 90 25 "
                stroke="orange"
                fill="transparent"
                strokeWidth="1"
              />
            </Svg>
          </View>
          <View className="mt-20">
            <Text className="text-white text-center">Màn hình</Text>

            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <View
                key={rowIndex}
                className="flex flex-row gap-2 justify-center items-center"
              >
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <MaterialIcons
                    key={`${rowIndex}-${colIndex}`}
                    name="chair"
                    size={24}
                    color="gray"
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="absolute top-12 left-3">
        <TouchableOpacity className="" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSeats;
