import { Link } from "expo-router";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import CustomButton from "@/components/UI/CustomButton";
import FormField from "@/components/UI/FormField";
import { useForm } from "react-hook-form";
import { icons, images } from "../../constants";
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
    <KeyboardAvoidingView
      className="flex justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="bg-white w-full flex justify-center text-center h-screen px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className=" container mx-auto"
          />
          <FormField
            title="Email or Mobile Number"
            otherStyles="mt-7"
            placeholder="Enter your email address"
            name={"Email or Mobile Number"}
            control={control}
            rules={{ required: "Please enter your email" }}
          />
          <FormField
            title="Full Name"
            otherStyles="mt-4"
            placeholder="Enter your full name"
            name={"Full Name"}
            control={control}
            rules={{ required: "Please enter your name" }}
          />
          <FormField
            title="Username"
            otherStyles="mt-4"
            placeholder="Enter your username"
            name={"Username"}
            control={control}
            rules={{ required: "Please enter your username" }}
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
          <View className="flex justify-center flex-row gap-2 my-8">
            <Link className="font-bold text-sky-500" href="#">
              <Image
                source={icons.iconFb}
                resizeMode="contain"
                className="mr-2"
              />
              Log in with Facebook
            </Link>
          </View>
          <View className="flex items-center ">
            <View className="h-0 border-b border-solid border-grey-500 grow" />
            <Text className=" text-gray-400 upcase">OR</Text>
            <View className="h-0 border-b border-solid border-grey-500 grow" />
          </View>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
