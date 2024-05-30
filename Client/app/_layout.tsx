import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthLayout from "./(auth)/_layout";
import Splash from "./(splash)";
import AdminNavigator from "./navigators/AdminNavigator";
import ClientTab from "./navigators/client/ClientTab";
import ClientRoute from "./navigators/client/ClientRoute";
const Stack = createNativeStackNavigator();
import { useNavigationState } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "@/common/redux/store";

const RootLayout = () => {
  const state = useNavigationState((state) => state);
  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(splash)/index" component={Splash} />
        <Stack.Screen
          name="navigators/AdminNavigator"
          component={AdminNavigator}
        />
        <Stack.Screen
          name="navigators/client/ClientTab"
          component={ClientTab}
        />
        <Stack.Screen
          name="navigators/client/ClientRoute"
          component={ClientRoute}
        />
        <Stack.Screen name="(auth)" component={AuthLayout} />
      </Stack.Navigator>
    </Provider>
  );
};

export default RootLayout;
