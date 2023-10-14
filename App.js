import {
  Box,
  Button,
  Text,
  ButtonText,
  GluestackUIProvider,
  View,
} from "@gluestack-ui/themed";
import { useState, useEffect } from "react";
import { config } from "./config/gluestack-ui.config";
import { StatusBar } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();
export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    switch (theme) {
      case "dark":
        StatusBar.setBarStyle(`light-content`);
        break;
      default:
        StatusBar.setBarStyle(`dark-content`);
        break;
    }
  }, [theme]);

  const contentStyle = {
    backgroundColor: theme === "light" ? "white" : "black",
  };

  return (
    <GluestackUIProvider colorMode={theme} config={config}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={WelcomeScreen}
              options={{
                headerShown: false,
                title: "Welcome",
                contentStyle: contentStyle,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
