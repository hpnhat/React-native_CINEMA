// src/navigators/client/ClientRoute.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MovieDetail from "@/app/(tabs)/client/MovieDetail";
import BookingSeats from "@/app/(tabs)/client/BookingSeats";

const Stack = createNativeStackNavigator();

const ClientRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
      <Stack.Screen name="BookingSeats" component={BookingSeats} />
    </Stack.Navigator>
  );
};

export default ClientRoute;
