// src/components/UI/MovieDetail.js
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Film, filmData } from "@/data";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { images } from "@/constants";
type MovieDetailRouteParams = {
  id: string;
};

type MovieDetailRouteProp = RouteProp<
  { params: MovieDetailRouteParams },
  "params"
>;
const genre = ["Action", "Comedy"];
const MovieDetail = () => {
  const { height } = Dimensions.get("window");
  const route = useRoute<MovieDetailRouteProp>();
  const { id } = route.params;
  const navigation: any = useNavigation();
  const movie = filmData.find((value: Film) => value.id === id);
  if (!movie) {
    return (
      <View>
        <Text>Movie not found</Text>
      </View>
    );
  }
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-full bg-primary"
      >
        <View>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOg9ClLYwrxUb4X3eph-Kk7BxfvPoZrArL0Q&s"
            className="w-full"
            style={styles.imageBG}
          />
          <Image
            src="https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg"
            style={styles.cardImage}
          />
        </View>
        <View className="mt-72 p-3">
          <View className="flex flex-row justify-center items-center">
            <MaterialIcons name="access-time" size={24} color="gray" />
            <Text className="text-white">1h29p</Text>
          </View>
          <Text className="text-white text-3xl text-center font-medium my-3">
            John Wick: Chapter 4
          </Text>
          <View className="flex flex-row gap-2 justify-center">
            {genre.map((item: string, i: number) => (
              <View
                key={i}
                className="border-2 border-gray-600 px-2 py-1 rounded-full"
              >
                <Text className="text-white">{item}</Text>
              </View>
            ))}
          </View>

          <View className="flex flex-row flex-start items-center mt-3">
            <View className="flex flex-row items-center gap-2">
              <AntDesign name="star" size={15} color="#E1CD17" />
              <Text className="text-white font-semibold">8.0 (1,024)</Text>
            </View>
            <Text className="text-white font-semibold ml-4">24 March 2023</Text>
          </View>
          <Text className="text-white text-justify my-1">
            With the price on his head ever increasing, John Wick uncovers a
            path to defeating The High Table. But before he can earn his
            freedom, Wick must face off against a new enemy with powerful
            alliances across the globe and forces that turn old friends into
            foes.
          </Text>
          <View className="flex flex-row mt-2">
            <Text className="text-white font-semibold">Đạo diễn: </Text>
            <FlatList
              horizontal
              data={genre}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <View>
                  <Text className="text-white">
                    {item}
                    {index < genre.length - 1 ? ", " : ""}
                  </Text>
                </View>
              )}
            />
          </View>
          <View className="flex flex-row mt-1">
            <Text className="text-white font-semibold">Diễn viên: </Text>
            <FlatList
              horizontal
              data={genre}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <View>
                  <Text className="text-white">
                    {item}
                    {index < genre.length - 1 ? ", " : ""}
                  </Text>
                </View>
              )}
            />
          </View>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={"0wZMUnmyL2U"}
            onChangeState={onStateChange}
          />
        </View>
      </ScrollView>
      <View className="absolute bottom-8 left-0 right-0 items-center ">
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("navigators/client/ClientRoute", {
              screen: "BookingSeats",
              params: { id: id },
            })
          }
        >
          <Text className="text-white text-sm">Select Seats</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute top-12 left-3">
        <TouchableOpacity className="" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieDetail;
const styles = StyleSheet.create({
  seatIcon: {
    fontSize: 24,
    color: "white",
  },
  imageBG: {
    width: "100%",
    aspectRatio: 3072 / 1727,
  },
  cardImage: {
    width: "60%",
    aspectRatio: 200 / 300,
    position: "absolute",
    top: 140,
    alignSelf: "center",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#FF6347",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
  },
});


