import CustomButton from "@/components/UI/CustomButton";
import FormField from "@/components/UI/FormField";
import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { images } from "../../constants";
import { IAuthSignUp } from "@/common/interfaces/Auth";
import { SignUpSchema } from "@/common/validations/auth";
import { joiResolver } from "@hookform/resolvers/joi";
import { AuthSignUp } from "@/common/services/auth";
import { useDispatch, useSelector } from "react-redux";

const SignUp = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAuthSignUp>({
    resolver: joiResolver(SignUpSchema),
  });
  const dispatch = useDispatch<any>();
  const handleRegister = async (data: IAuthSignUp) => {
    try {
      const { confirmPassword, ...formData } = data;
      const serializedFormData: any = {
        ...formData,
        birthDate: formData.birthDate.getTime(), // Chuyển đổi birthDate thành timestamp (số)
      };
      console.log(serializedFormData);
      dispatch(AuthSignUp(serializedFormData));
      // navigation.replace("navigators/client/ClientTab");
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date("2010-01-01"));

  return (
    <SafeAreaView className="bg-primary h-full flex justify-center">
      <KeyboardAwareScrollView enableOnAndroid>
        <View className="w-full flex justify-center items-center px-4 mb-24">
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
            otherStyles="mt-5"
            placeholder="Họ và tên"
            name={"fullName"}
            control={control}
            rules={{ required: true }}
            errors={errors}
          />
          <FormField
            title="Email"
            otherStyles="mt-5"
            placeholder="Email"
            name={"email"}
            keyboardType="email-address"
            control={control}
            rules={{ required: true }}
            errors={errors}
          />
          <FormField
            title="phone"
            otherStyles="mt-5"
            placeholder="Số điện thoại"
            name={"phone"}
            keyboardType="phone-pad"
            control={control}
            rules={{ required: true }}
            errors={errors}
          />
          <View className="w-full my-4">
            <Text className="text-white">Giới tính (Tùy chọn)</Text>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View className="flex flex-row justify-around mt-5">
                  <View className="flex flex-row items-center gap-2">
                    <Checkbox
                      className="rounded-md"
                      value={value === "male"}
                      onValueChange={() => onChange("male")}
                    />
                    <Text className="text-white">Nam</Text>
                  </View>
                  <View className="flex flex-row items-center gap-2">
                    <Checkbox
                      className="rounded-md"
                      value={value === "female"}
                      onValueChange={() => onChange("female")}
                    />
                    <Text className="text-white">Nữ</Text>
                  </View>
                  <View className="flex flex-row items-center gap-2">
                    <Checkbox
                      className="rounded-md"
                      value={value === "unknown"}
                      onValueChange={() => onChange("unknown")}
                    />
                    <Text className="text-white">Chưa xác định</Text>
                  </View>
                </View>
              )}
            />
            {errors.gender && (
              <Text className="text-red-500">{errors.gender.message}</Text>
            )}
          </View>
          <TouchableOpacity
            className="w-full"
            onPress={() => setDatePickerVisibility(true)}
          >
            <View className="w-full h-14 px-4 rounded-2xl border-2 border-gray-200 focus:border-sky-500 flex flex-row items-center mt-2">
              <Controller
                name="birthDate"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="flex-1 text-white font-psemibold text-xs"
                    editable={false}
                    placeholderTextColor={"white"}
                    placeholder="Choose Your Date of Birth"
                    value={
                      birthDate
                        ? `${birthDate.getDate()} ${birthDate.toLocaleString(
                            "vi-VN",
                            { month: "long" }
                          )} ${birthDate.getFullYear()}`
                        : ""
                    }
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.birthDate && (
                <Text className="text-red-500">{errors.birthDate.message}</Text>
              )}
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            maximumDate={new Date(2009, 11, 31)}
            minimumDate={new Date(1950, 0, 1)}
            confirmTextIOS="Xác nhận"
            cancelTextIOS="Đóng"
            locale="vi"
            isVisible={isDatePickerVisible}
            mode="date"
            date={birthDate}
            onCancel={() => setDatePickerVisibility(false)}
            onConfirm={(date: any) => {
              setBirthDate(date);
              setDatePickerVisibility(false);
              setValue("birthDate", date);
            }}
          />
          <FormField
            title="Password"
            otherStyles="my-5"
            placeholder={"Mật khẩu"}
            name={"password"}
            control={control}
            rules={{ required: true }}
            errors={errors}
          />
          <FormField
            title="Password"
            otherStyles="mb-5"
            placeholder={"Nhập lại mật khẩu"}
            name={"confirmPassword"}
            control={control}
            rules={{ required: true }}
            errors={errors}
          />
        </View>
      </KeyboardAwareScrollView>

      <View className="absolute bottom-14 w-full h-16">
        <CustomButton
          title="Đăng ký"
          handlePress={handleSubmit(handleRegister)}
        />
      </View>
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
    </SafeAreaView>
  );
};
export default SignUp;
