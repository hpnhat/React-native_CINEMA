import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

const Setting = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View>
        <Text>Setting</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>GO back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
