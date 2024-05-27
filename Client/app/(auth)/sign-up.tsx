import { Link } from "expo-router";
import {
  Alert,
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
import { useForm } from "react-hook-form";
import { icons, images } from "../../constants";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
type Input = {
  email: string;
  password: string;
};

const SignUp = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSignUpPress = (data: Input) => {
    // console.log(data);
  };

  return (
    <View className="bg-primary h-full relative">
      <KeyboardAvoidingView
        className="flex justify-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="bg-primary w-full flex items-center text-center px-4 mt-20">
            <Image
              source={images.bear}
              resizeMode="contain"
              className="w-[150px] h-[150px]"
            />
            <Text className="text-white capitalize font-bold text-2xl">
              đăng ký thành viên
            </Text>
            <FormField
              title="Full Name"
              otherStyles="mt-4"
              placeholder="Họ và tên"
              name={"Full Name"}
              control={control}
              rules={{ required: "Please enter your name" }}
            />
            <FormField
              title="Email"
              otherStyles="mt-7"
              placeholder="Email"
              name={"Email"}
              keyboardType="email-address"
              control={control}
              rules={{ required: "Please enter your email" }}
            />
            <FormField
              title="Phone"
              otherStyles="mt-7"
              placeholder="Số điện thoại"
              name={"Phone"}
              keyboardType="phone-pad"
              control={control}
              rules={{ required: "Please enter your number phone" }}
            />
            <FormField
              title="Password"
              otherStyles="my-4"
              placeholder={"Enter your password"}
              name={"password"}
              control={control}
              rules={{ required: "Please enter your password" }}
            />
            <CustomButton
              title="Sign Up"
              handlePress={handleSubmit(onSignUpPress)}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className="absolute top-14 left-6">
        <TouchableOpacity className="" onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-8 right-0 left-0 items-center ">
        <View className="flex justify-center flex-row gap-2 mt-8">
          <Text className="text-sm text-gray-100 mt-0 font-pregular">
            Have an account?
          </Text>
          <Text
            className="text-sm font-psemibold text-sky-500"
            onPress={() => {
              Alert.alert(
                "Bạn có tài khoản?",
                "Bạn có muốn đến trang đăng nhập?",
                [
                  {
                    text: "Có",
                    onPress: () => navigation.navigate("sign-in"),
                  },
                  {
                    text: "Không",
                    style: "cancel",
                  },
                ],
                { cancelable: true }
              );
            }}
          >
            Sign in.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default SignUp;
