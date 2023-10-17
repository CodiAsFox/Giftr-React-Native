import {
  GluestackUIProvider,
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Text,
  View,
  Image,
  SunIcon,
  MoonIcon,
} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { config } from "./config/gluestack-ui.config";
import { StatusBar, StyleSheet } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import {
  NavigationContainer,
  useNavigation,
  NavigationContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storeData, getData } from "./utils/Storage";
import { Ionicons } from "@expo/vector-icons";
import Settings from "./components/Settings";
import { BlurView } from "expo-blur";

import AddPersonScreen from "./screens/AddPersonScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  const [colorMode, setTheme] = useState("dark");

  const navigation = React.useContext(NavigationContext);

  console.log(navigation);

  useEffect(() => {
    getData("ui_theme").then((value) => {
      if (value) {
        setTheme(value);
      }
    });
  }, []);

  useEffect(() => {
    switch (colorMode) {
      case "dark":
        StatusBar.setBarStyle(`light-content`);
        break;
      default:
        StatusBar.setBarStyle(`dark-content`);
        break;
    }

    storeData("ui_theme", colorMode);
  }, [colorMode]);

  const contentStyle = {
    backgroundColor: colorMode === "light" ? "white" : "black",
  };

  let textColour = colorMode === "light" ? "#8a2419" : "#e0c089";

  let AddPerson = () => {
    const navigation = useNavigation();
    console.log(navigation);
    return (
      <BlurView intensity={100} tint={colorMode} style={styles.blurContainer}>
        <Button
          onPress={() => {
            navigation.navigate("AddPerson");
          }}
          size="xs"
          variant="outline"
          action="secondary"
        >
          <ButtonText color={textColour}>Add Person </ButtonText>
          <ButtonIcon as={Ionicons} name="ios-person-add" />
        </Button>
      </BlurView>
    );
  };

  return (
    <GluestackUIProvider colorMode={colorMode} config={config}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              options={{
                headerShown: false,
                contentStyle: contentStyle,
              }}
            >
              {(props) => <WelcomeScreen {...props} setTheme={setTheme} />}
            </Stack.Screen>
            <Stack.Screen
              name="Home"
              options={{
                headerShown: true,
                title: "",
                contentStyle: contentStyle,
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTintColor: textColour,
                headerRight: (props) => {
                  console.log(props, this);
                  return <AddPerson />;
                },
                headerLeft: () => <Settings setTheme={setTheme} />,
              }}
            >
              {(props) => <HomeScreen {...props} setTheme={setTheme} />}
            </Stack.Screen>
            <Stack.Screen
              name="AddPerson"
              options={{
                headerShown: true,
                title: "Add Person",
                contentStyle: contentStyle,
                headerStyle: {
                  backgroundColor: "transparent",
                },
                headerTintColor: textColour,
                headerRight: (props) => {
                  console.log(props);
                  // return <AddPerson />;
                },
              }}
            >
              {(props) => <AddPersonScreen {...props} setTheme={setTheme} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
const styles = StyleSheet.create({
  blurContainer: {
    width: "auto",
    padding: 0,
    margin: 0,
    left: 10,
  },
});
