import { GluestackUIProvider } from "@gluestack-ui/themed";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DataProvider } from "./Utils/DataProvider";
import PeopleScreen from "./Screens/PeopleScreen";
import IdeaScreen from "./Screens/IdeaScreen";
import AddIdeaScreen from "./Screens/Forms/AddIdeaScreen";

import AddPersonScreen from "./Screens/Forms/AddPersonScreen";
import { config } from "@gluestack-ui/config";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <DataProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
              <Stack.Screen
                name="AddPersonScreen"
                component={AddPersonScreen}
                options={{ presentation: "modal" }}
              />
              <Stack.Screen name="IdeaScreen" component={IdeaScreen} />
              <Stack.Screen
                name="AddIdeaScreen"
                component={AddIdeaScreen}
                options={{ presentation: "modal" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </DataProvider>
    </GluestackUIProvider>
  );
}
