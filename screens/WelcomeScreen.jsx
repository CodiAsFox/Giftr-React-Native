import {
  Box,
  Button,
  Text,
  ButtonText,
  ButtonIcon,
  Heading,
  Image,
  HStack,
  AddIcon,
  tack,
  GluestackUIProvider,
} from "@gluestack-ui/themed";
import React from "react";
import { BlurView } from "expo-blur";
import { useColorMode } from "@gluestack-ui/themed";
import AnimationPlayer from "../components/AnimationPlayer";
import { SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  const colorMode = useColorMode();
  let welcomeAnimation = require("../assets/animations/welcome.json");
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.background}
        contentFit="cover"
        source={require("../assets/background.jpg")}
      />
      <Box flex={1} justifyContent="center" alignItems="center">
        <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
          <Heading>Welcome to Giftr</Heading>
          <AnimationPlayer animation={welcomeAnimation} loop={false} />
          <Button
            onPress={() => navigation.navigate("Home")}
            padding={2}
            size="lg"
            variant="solid"
            action="positive"
            borderRadius={2}
            style={{}}
          >
            <ButtonText color="white">Go to Home</ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </BlurView>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  buttonWrapper: {
    flex: 1,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 55,
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
    top: 0,
    bottom: 0,
    flexWrap: "wrap",
    width: "100%",
    height: "150%",
    ...StyleSheet.absoluteFill,
  },
  title: {
    flex: 1,
    fontSize: 45,
    letterSpacing: 2.0,
    flexShrink: 1,
    lineHeight: 55,
    fontWeight: "700",
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
