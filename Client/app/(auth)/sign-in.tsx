import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import CustomButton from "@/components/UI/CustomButton";
import FormField from "@/components/UI/FormField";
import React from "react";
import { useForm } from "react-hook-form";
import { images } from "../../constants";
type Input = {
  email: string;
  password: string;
};

const SignIn = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSignInPress = (data: Input) => {
    // console.log(data);
  };

  return (
    <KeyboardAvoidingView
      className="flex justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className=" w-full bg-primary flex justify-around h-screen px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className=" container mx-auto w-60"
          />
          <View>
            <FormField
              title="Email"
              otherStyles=""
              placeholder="Email hoặc Số điện thoại"
              name={"email"}
              control={control}
              rules={{ required: "Please enter your email" }}
            />
            <FormField
              title="Password"
              otherStyles="mt-4"
              placeholder={"Mật khẩu"}
              name={"password"}
              control={control}
              rules={{ required: "Please enter your password" }}
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
              onPress={() => navigation.navigate("sign-up")}
              className="text-sm font-psemibold text-sky-500"
            >
              Đăng ký ngay
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar backgroundColor="#161622" style="light" />
    </KeyboardAvoidingView>
  );
};

export default SignIn;
