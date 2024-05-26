import Home from "@/app/(tabs)/client/Home";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Account from "../../(tabs)/client/Account";
import Search from "../../(tabs)/client/Search";
import Ticket from "../../(tabs)/client/Ticket";
import MovieDetail from "@/app/(tabs)/client/MovieDetail";
const Tabs = createBottomTabNavigator();
const ClientTab = () => {
  return (
    <>
      <Tabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          headerShown: false,
          tabBarStyle: { backgroundColor: "#161622" },
        }}
      >
        <Tabs.Screen
          name="Trang chủ"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Octicons name="home" color={color} size={23} />
            ),
          }}
        />
        <Tabs.Screen
          name="Tìm kiếm"
          component={Search}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="search1" size={23} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Ticker"
          component={Ticket}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={23}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Tài khoản"
          component={Account}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={23} color={color} />
            ),
          }}
        />
      </Tabs.Navigator>
    </>
  );
};

export default ClientTab;
