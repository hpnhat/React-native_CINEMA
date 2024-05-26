import React from "react";
import SignIn from "./sign-in";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./sign-up";
const Stack = createStackNavigator();
const AuthLayout = () => {
  return (
    <Stack.Navigator initialRouteName="sign-in">
      <Stack.Screen
        name="sign-in"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SignUp}
        name="sign-up"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthLayout;
