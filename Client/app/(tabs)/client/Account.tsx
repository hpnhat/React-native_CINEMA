import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { images } from "@/constants";

const Account = () => {
  const navigation: any = useNavigation();
  return (
    <View className="bg-primary h-full">
      <View className="absolute right-9 top-12"></View>
      <SafeAreaView>
        <View className="flex flex-row items-center justify-between px-6">
          <View className="flex-1 items-center">
            <Text className="text-white text-center font-medium text-2xl pl-8">
              Tài khoản
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
            <AntDesign name="setting" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex justify-center items-center">
          <Image source={images.bear} className="w-[150px] h-[150px]" />
          <Text className="capitalize text-white font-bold text-xl">
            đăng ký thành viên
          </Text>
          <Text className="capitalize text-white font-bold text-lg">
            nhận ngay ưu đãi!!
          </Text>
          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("(auth)", {
                  screen: "sign-in",
                })
              }
            >
              <View className="border-2 border-orange-500 p-2 bg-orange-500 rounded">
                <Text className="text-white">Đăng nhập</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("(auth)", {
                  screen: "sign-up",
                })
              }
            >
              <View className="border-2 border-orange-500 py-2 px-4 rounded">
                <Text className="text-white">Đăng ký</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Account;
