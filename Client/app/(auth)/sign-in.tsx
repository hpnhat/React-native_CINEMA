import { Link, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import CustomButton from "@/components/UI/CustomButton";
import FormField from "@/components/UI/FormField";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { images } from "../../constants";
import { SignInSchema } from "@/common/validations/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthSignIn } from "@/common/services/auth";
import { IAuthSignIn } from "@/common/interfaces/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignIn = () => {
  const navigation: any = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthSignIn>({ resolver: joiResolver(SignInSchema) });
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: any) => state.auth);
  const onSignInPress = async (data: IAuthSignIn) => {
    try {
      await dispatch(AuthSignIn(data));
      navigation.replace("navigators/client/ClientTab");
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  // console.log(error)
  return (
    <View className="bg-primary h-full flex justify-center">
      <KeyboardAvoidingView
        className="flex justify-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className=" w-full flex justify-center px-4">
            <Image
              source={images.logo}
              resizeMode="contain"
              className=" container mx-auto w-60"
            />
            <View>
              <FormField
                title="Tài khoản"
                otherStyles=""
                placeholder="Số điện thoại"
                name={"phone"}
                control={control}
                rules={{ required: true }}
                errors={errors}
              />
              <FormField
                title="Password"
                otherStyles="mt-4"
                placeholder={"Mật khẩu"}
                name={"password"}
                control={control}
                rules={{ required: true }}
                errors={errors}
              />
              <Link
                className="w-full text-sky-500 text-right my-4"
                href={"/forgot-password"}
              >
                Quên mật khẩu?
              </Link>
              <CustomButton
                title="Đăng nhập"
                handlePress={handleSubmit(onSignInPress)}
              />
            </View>
            <View className="flex justify-center flex-row gap-2 mt-8">
              <Text className="text-sm text-gray-100 mt-0 font-pregular">
                Bạn chưa có tài khoản ?
              </Text>
              <Text
                onPress={() =>
                  navigation.navigate("(auth)", {
                    screen: "sign-up",
                  })
                }
                className="text-sm font-psemibold text-sky-500"
              >
                Đăng ký ngay
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <StatusBar backgroundColor="#161622" style="light" />
      </KeyboardAvoidingView>
      <View className="absolute top-14 left-6">
        <TouchableOpacity className="" onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
