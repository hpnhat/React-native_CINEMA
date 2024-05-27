import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeatSelection = (rowIndex: number, colIndex: number) => {
    const seatId = `${rowIndex}-${colIndex}`;
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((seat) => seat !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-full bg-primary"
      >
        <View className="relative">
          <View className="absolute w-full h-full  drop-shadow-lg">
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
                className="flex flex-row gap-3 justify-center items-center"
              >
                <Text className="text-white">{rowIndex}</Text>
                {Array.from({ length: 10 }).map((_, colIndex) => {
                  const seatId = `${rowIndex}-${colIndex}`;
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <TouchableOpacity
                      key={seatId}
                      onPress={() => toggleSeatSelection(rowIndex, colIndex)}
                    >
                      <MaterialIcons
                        name="chair"
                        size={24}
                        color={isSelected ? "white" : "gray"}
                      />
                    </TouchableOpacity>
                  );
                })}
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
