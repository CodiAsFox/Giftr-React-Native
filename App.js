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
import { ThemeProvider, ThemeContext } from "./Utils/ThemeProvider";
import React, { useState, useEffect, useContext } from "react";
import { config } from "./config/gluestack-ui.config";
import { StatusBar, StyleSheet, Alert } from "react-native";
import WelcomeScreen from "./Screens/WelcomeScreen";
import {
  NavigationContainer,
  useNavigation,
  NavigationContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storeData, getData } from "./Utils/Storage";
import { Ionicons } from "@expo/vector-icons";
import Settings from "./Components/Settings";
import { BlurView } from "expo-blur";

import { DataProvider } from "./Utils/DataProvider";
import PeopleScreen from "./Screens/PeopleScreen";
import IdeaScreen from "./Screens/IdeaScreen";
import AddIdeaScreen from "./Screens/Forms/AddIdeaScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AddPersonScreen from "./Screens/Forms/AddPersonScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [colorMode, setTheme] = useState("dark");

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider colorMode={colorMode} config={config}>
        <ThemeProvider>
          <DataProvider>
            <SafeAreaProvider>
              <AppNavigation setTheme={setTheme} />
            </SafeAreaProvider>
          </DataProvider>
        </ThemeProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
function AppNavigation({ setTheme }) {
  const { bodyStyle, headerStyle, textColour } = useContext(ThemeContext);

  const AddPerson = () => {
    const navigation = useNavigation();
    return (
      <Button
        onPress={() => {
          navigation.navigate("AddPersonScreen");
        }}
        size="md"
        variant="link"
        action="secondary"
      >
        <ButtonIcon as={Ionicons} name="ios-person-add" />
      </Button>
    );
  };

  const Cancel = () => {
    const navigation = useNavigation();
    return (
      <Button
        onPress={() => {
          Alert.alert(
            "Discard changes",
            "If you leave now, your changes will be lost.",
            [
              {
                text: "Exit",
                onPress: () => {
                  navigation.goBack();
                },
                style: "destructive",
              },
              {
                text: "Keep Editing",
                style: "confirm",
              },
            ]
          );
        }}
        size="md"
        variant="link"
        action="secondary"
      >
        <ButtonText show color={textColour}>
          Cancel
        </ButtonText>
      </Button>
    );
  };

  const Back = () => {
    const navigation = useNavigation();
    return (
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        size="xs"
        variant="link"
        action="secondary"
      >
        <ButtonIcon as={Ionicons} name="arrow-back-sharp" size={25} />
        {/* <ButtonText show color={textColour}>Back </ButtonText> */}
      </Button>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PeopleScreen"
          component={PeopleScreen}
          options={{
            title: "Home",
            contentStyle: bodyStyle,
            headerStyle: headerStyle,
            headerTintColor: textColour,
            headerRight: (props) => {
              return <AddPerson />;
            },
            headerLeft: () => <Settings setTheme={setTheme} />,
          }}
        />
        <Stack.Screen
          name="AddPersonScreen"
          component={AddPersonScreen}
          options={{
            title: "Add Person",
            contentStyle: bodyStyle,
            headerStyle: headerStyle,
            headerTintColor: textColour,
            headerLeft: () => <Cancel />,
          }}
        />
        <Stack.Screen
          name="IdeaScreen"
          component={IdeaScreen}
          options={{
            title: "Ideas",
            contentStyle: bodyStyle,
            headerStyle: headerStyle,
            headerTintColor: textColour,
          }}
        />
        <Stack.Screen
          name="AddIdeaScreen"
          component={AddIdeaScreen}
          options={{
            title: "Add Idea",
            contentStyle: bodyStyle,
            headerStyle: headerStyle,
            headerTintColor: textColour,
          }}
        />
        {/* <Stack.Screen
              name="Welcome"
              options={{
                headerShown: false,
                contentStyle: contentStyle,
              }}
            >
              {(props) => <WelcomeScreen {...props} setTheme={setTheme} />}
            </Stack.Screen> */}
        {/* <Stack.Screen
                  name="Home"
                  options={{
                    headerShown: true,
                    title: "My List",
                    contentStyle: contentStyle,
                    headerStyle: headerStyle,
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
                    headerStyle: headerStyle,
                    headerTintColor: textColour,
                    headerRight: (props) => {
                      console.log(props);
                      // return <AddPerson />;
                    },
                  }}
                >
                  {(props) => (
                    <AddPersonScreen {...props} setTheme={setTheme} />
                  )}
                </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
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
