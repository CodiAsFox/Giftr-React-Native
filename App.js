/***
 * Oh, Hi Steve, is a surprise seeing you here.
 *
 * Again I think I made something more complex than it should be.
 * But I am having so much fun with React Native. I hope it's ok.
 *
 * Tay.
 * ***/

import { GluestackUIProvider } from "@gluestack-ui/themed";
import React, { useState, useEffect, useContext } from "react";
import { Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DataProvider, setData, getData } from "./Utils/DataProvider";
import PeopleScreen from "./Screens/PeopleScreen";
import { config } from "@gluestack-ui/config";
import IdeaScreen from "./Screens/IdeaScreen";
import AddIdeaScreen from "./Screens/Forms/AddIdeaScreen";

import BackButton from "./Components/BackButton";
import AddPersonScreen from "./Screens/Forms/AddPersonScreen";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const os = Platform.OS;

  const options = {
    ios: {},
    android: {
      presentation: "card",
    },
  };

  const navBar = {
    ios: {
      headerRight: () => <></>,
      headerLeft: () => <BackButton />,
    },
    android: {
      headerRight: () => <BackButton />,
      headerLeft: () => <></>,
    },
  };

  const screenProps = options[os];
  const navProps = navBar[os];

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PeopleScreen"
          component={PeopleScreen}
          options={() => ({ ...screenProps })}
        />
        <Stack.Screen
          name="AddPersonScreen"
          component={AddPersonScreen}
          options={() => ({
            ...screenProps,
            presentation: os == "ios" ? "modal" : "card",
            ...navProps,
          })}
        />
        <Stack.Screen
          name="IdeaScreen"
          component={IdeaScreen}
          options={screenProps}
        />
        <Stack.Screen
          name="AddIdeaScreen"
          component={AddIdeaScreen}
          options={() => ({
            ...screenProps,
            presentation: os == "ios" ? "modal" : "card",
            ...navProps,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <DataProvider>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </DataProvider>
    </GluestackUIProvider>
  );
}
