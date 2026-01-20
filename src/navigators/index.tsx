import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Route } from "src/utils/constants";

import CollectedRewardsScreen from "src/screens/CollectedRewardsScreen";
import HomeScreen from "src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        animation: "slide_from_right",
      }}
      initialRouteName={Route.HomeScreen}
    >
      <Stack.Screen name={Route.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={Route.CollectedRewardsScreen} component={CollectedRewardsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
