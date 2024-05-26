import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { images } from "../../constants";
const Splash = () => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("navigators/client/ClientTab");
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex justify-center items-center h-full px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => router.replace("navigators/AdminNavigator")}
            >
              <Text>12313</Text>
            </TouchableOpacity>
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Đặt Vé Dễ Dàng,{"\n"}
                Trải Nghiệm Hoàn Hảo Cùng{" "}
                <Text className="text-secondary-200 pb-2">Galaxy</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-3 right-12"
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Đặt vé nhanh chóng, nhận ưu đãi hấp dẫn và thưởng thức những bộ
              phim tuyệt vời.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar backgroundColor="white" style="light" />
    </>
  );
};
export default Splash;
