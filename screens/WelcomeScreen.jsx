import {
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Image,
  SunIcon,
  MoonIcon,
} from "@gluestack-ui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { BlurView } from "expo-blur";
import { useColorMode } from "@gluestack-ui/themed";
import AnimationPlayer from "../Components/AnimationPlayer";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import { storeData, getData } from "../Utils/Storage";
import { Assets, Animations } from "../assets/Assets";
import { ThemeContext } from "../Utils/ThemeProvider";

export default function HomeScreen({ navigation, setTheme }) {
  const colorMode = useColorMode();
  const { welcomeBg, toggleLink, toggleIcon } = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={welcomeBg}
        resizeMode="cover"
        style={styles.background}
      >
        <Box style={styles.welcomeMessage}>
          <BlurView
            intensity={90}
            tint={colorMode}
            style={styles.blurContainer}
          >
            <Heading style={styles.Heading}>Welcome to Giftr</Heading>
            <AnimationPlayer animation={Animations.welcome} loop={false} />
            <Button
              onPress={() => {
                setTheme(colorMode === "dark" ? "light" : "dark");
              }}
              size="xs"
              variant="outline"
              action="secondary"
            >
              <ButtonText>{toggleLink}</ButtonText>
              <ButtonIcon as={toggleIcon} />
            </Button>
          </BlurView>
          <Button
            onPress={() => navigation.navigate("Home")}
            padding={2}
            size="lg"
            action="link"
            borderRadius={2}
            style={styles.buttonWrapper}
          >
            <ButtonText color="white">Start gifting </ButtonText>
            <FontAwesome5 name="gifts" size={17} color="white" />
          </Button>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center",
  },
  blurContainer: {
    // flex: 1,
    padding: 40,
    paddingBottom: 35,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  Heading: {
    fontSize: 30,
  },
  buttonWrapper: {
    flex: 1,
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 45,
  },
  welcomeMessage: {
    flex: 1,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  continueButtonBtn: {
    width: "100%",
    backgroundColor: "#c57cc1",
    color: "#ffffff",
    fontSize: 18,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 25,
    paddingBottom: 25,
  },
  linearGradient: {
    flexGrow: 1,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  titleFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    top: "30%",
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
  },
  title: {
    flex: 1,
    fontSize: 45,
    letterSpacing: 2.0,
    flexShrink: 1,
    lineHeight: 55,
    fontWeight: 700,
    height: 60,
    overflow: "hidden",
  },
  subTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 29,
    fontWeight: "500",
    color: "#e9e9ff",
    width: 300,
    height: 36,
  },
  textView: {
    flex: 1,
    paddingHorizontal: "5%",
  },
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#181933",
  },
});
