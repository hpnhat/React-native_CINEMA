import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Film, filmDataComingSoon, filmDataNowShowing } from "@/data";

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [cancelButtonOpacity] = useState(new Animated.Value(0));
  const [selectedCategory, setSelectedCategory] = useState("nowShowing");
  const [movies, setMovies] = useState<Film[]>([]);

  useEffect(() => {
    if (selectedCategory === "nowShowing") {
      setMovies(filmDataNowShowing);
    } else {
      setMovies(filmDataComingSoon);
    }
  }, [selectedCategory]);
  useEffect(() => {
    Animated.timing(cancelButtonOpacity, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <View
        className={`border-b border-gray-400 pt-3 pb-6  ${
          isFocused ? "pl-3" : "px-3"
        }`}
      >
        <View className="flex flex-row justify-between items-center ">
          <View
            className={`flex flex-row items-center w-10/12 px-4 rounded-xl border-x border-gray-500 ${
              isFocused ? "w-10/12" : "w-full"
            }`}
          >
            <TextInput
              className="h-10 text-sm flex-1 text-white"
              placeholder="Tìm kiếm..."
              placeholderTextColor="white"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {searchText !== "" && (
              <TouchableOpacity
                className="ml-2"
                onPress={() => setSearchText("")}
              >
                <Ionicons name="close-circle-outline" size={24} color="gray" />
              </TouchableOpacity>
            )}
          </View>

          <Animated.View
            style={{ opacity: cancelButtonOpacity }}
            className="w-auto h-auto "
          >
            <TouchableOpacity
              className="ml-4"
              onPress={() => {
                setIsFocused(false);
                Keyboard.dismiss();
                // setSearchText("");
              }}
            >
              <Text className="text-center text-base text-white mr-4">Hủy</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <ScrollView>
        <View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  cancelButton: {
    width: "auto", // Độ rộng tự động
    height: "auto", // Chiều cao tự động
  },
});
