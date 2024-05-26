import MovieCard from "@/components/UI/MovieCard";
import { Film, filmData, filmDataComingSoon, filmDataNowShowing } from "@/data";
import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Spacer = {
  key: string;
};

type FilmData = Film | Spacer;

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = width * 0.72;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const Home = () => {
  const navigation: any = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [selectedCategory, setSelectedCategory] = useState("nowShowing");
  const [movies, setMovies] = useState<Film[]>([]);

  useEffect(() => {
    if (selectedCategory === "nowShowing") {
      setMovies(filmDataNowShowing);
    } else {
      setMovies(filmDataComingSoon);
    }
  }, [selectedCategory]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Text className="text-white font-bold px-8 text-2xl">Phổ biến</Text>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={
            [
              { key: "left-spacer" },
              ...filmData,
              { key: "right-spacer" },
            ] as FilmData[]
          }
          keyExtractor={(item) =>
            "id" in item ? item.id.toString() : item.key
          }
          horizontal
          bounces={false}
          decelerationRate={0.2}
          contentContainerStyle={{
            alignItems: "center",
          }}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            if ("key" in item) {
              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
            }
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [15, 0, 15],
              extrapolate: "clamp",
            });

            return (
              <View style={{ width: ITEM_SIZE, height: height * 0.57 }}>
                <Animated.View
                  style={{
                    marginHorizontal: 10,
                    padding: 10,
                    transform: [{ translateY }],
                  }}
                >
                  <MovieCard
                    title={item.title}
                    genre={item.genre}
                    imagePath={item.uri}
                    cardFunction={() =>
                      navigation.navigate("navigators/client/ClientRoute", {
                        screen: "MovieDetail",
                        params: { id: item.id },
                      })
                    }
                  />
                </Animated.View>
              </View>
            );
          }}
        />
        <View className="p-4">
          <View className="flex flex-row gap-3">
            <TouchableOpacity onPress={() => setSelectedCategory("nowShowing")}>
              <Text
                className={`${
                  selectedCategory === "nowShowing"
                    ? "text-white"
                    : "text-gray-500"
                } text-lg font-medium`}
              >
                Đang chiếu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedCategory("upcoming")}>
              <Text
                className={`${
                  selectedCategory === "upcoming"
                    ? "text-white"
                    : "text-gray-500"
                }
                text-lg font-medium`}
              >
                Sắp chiếu
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row flex-wrap justify-between gap-2 mt-5">
            {movies.map((item, index) => (
              <View
                key={index}
                style={{
                  flexBasis: "50%",
                  maxWidth: "48%",
                }}
              >
                <Image
                  src={item.uri}
                  className="w-full h-64 rounded-xl object-cover"
                />
                <Text className="text-white">{item.title}</Text>
              </View>
            ))}
          </View>
        </View>
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
