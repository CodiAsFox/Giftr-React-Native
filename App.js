import { GluestackUIProvider, View } from "@gluestack-ui/themed";
import { useState, useEffect } from "react";
import { config } from "./config/gluestack-ui.config";
import { StatusBar } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storeData, getData } from "./utils/Storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    getData("ui_theme").then((value) => {
      if (value) {
        setTheme(value);
      }
    });
  }, []);

  useEffect(() => {
    switch (theme) {
      case "dark":
        StatusBar.setBarStyle(`light-content`);
        break;
      default:
        StatusBar.setBarStyle(`dark-content`);
        break;
    }

    storeData("ui_theme", theme);
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
              name="Welcome"
              options={{
                headerShown: false,
                title: "Welcome",
                contentStyle: contentStyle,
              }}
            >
              {(props) => <WelcomeScreen {...props} setTheme={setTheme} />}
            </Stack.Screen>
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
                title: "Home",
                contentStyle: contentStyle,
                headerStyle: {
                  backgroundColor: theme === "light" ? "white" : "black",
                },
                headerTintColor: theme === "light" ? "black" : "white",
                headerRight: () => <></>,
                headerLeft: () => <></>,
              }}
            >
              {(props) => <HomeScreen {...props} setTheme={setTheme} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
