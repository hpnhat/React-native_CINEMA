import Dashboard from "@/app/(tabs)/admin/Dashboard";
import { Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
const Tabs = createBottomTabNavigator();
const AdminNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={25} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default AdminNavigator;
