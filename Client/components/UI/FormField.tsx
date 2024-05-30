import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../../constants";
import { Controller } from "react-hook-form";
import React from "react";
interface FormFieldProps {
  name: string;
  title: string;
  placeholder: string;
  otherStyles?: string;
  control: any;
  value?: string;
  rules: any;
  keyboardType?: any;
  errors: any;
}
const FormField = ({
  name,
  title,
  placeholder,
  otherStyles,
  control,
  value,
  rules,
  keyboardType,
  errors,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View className={`space-y-2 ${otherStyles}`}>
        {/* <Text className="text-sm text-gray-100 font-pmedium">{title}</Text> */}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View className="w-full h-14 px-4  rounded-2xl border-2 border-gray-200 focus:border-sky-500 flex flex-row items-center">
                <TextInput
                  className="flex-1 text-white font-psemibold text-xs"
                  placeholderTextColor="#7B7B8B"
                  secureTextEntry={title === "Password" && !showPassword}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType={keyboardType}
                  {...props}
                />

                {title === "Password" && (
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Image
                      source={!showPassword ? icons.eye : icons.eyeHide}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
              </View>
              {errors[name] && (
                <Text className=" mt-1" style={{ color: "#FF4D4D" }}>
                  {errors[name].message}
                </Text>
              )}
            </>
          )}
        />
      </View>
    </>
  );
};

export default FormField;
