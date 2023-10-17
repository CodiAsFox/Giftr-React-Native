import {
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
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { BlurView } from "expo-blur";
import { useColorMode } from "@gluestack-ui/themed";
import AnimationPlayer from "../components/AnimationPlayer";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation, setTheme }) {
  const colorMode = useColorMode();

  switch (colorMode) {
    case "dark":
      bannerImg = require("../assets/BannerDark.jpeg");
      toggleLink = "Light Mode ";
      toggleIcon = SunIcon;
      break;
    default:
      bannerImg = require("../assets/BannerLight.jpeg");
      toggleLink = "Dark Mode ";
      toggleIcon = MoonIcon;
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground
          source={bannerImg}
          resizeMode="cover"
          style={styles.banner}
        />
        <Heading style={styles.bannerText}>My List</Heading>
      </View>
      <View>
        <Box style={styles.emptyBody}>
          <Heading style>No people saved.</Heading>
          <Text style={{ marginBottom: 20 }}>Add a person to get started.</Text>
          <AnimationPlayer
            animation={require("../assets/animations/SadFox.json")}
            autoPlay={true}
            loop={false}
          />
          <Button
            onPress={() => {
              navigation.navigate("AddPerson");
            }}
            size="xs"
            variant="outline"
            action="secondary"
            style={styles.button}
          >
            <ButtonText>Add Person </ButtonText>
            <ButtonIcon as={Ionicons} name="ios-person-add" />
          </Button>
        </Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  emptyBody: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  banner: {
    // position: "absolute",
    top: -35,
    left: 0,
    width: "100%",
    height: 200,
    // alignContent: "center",
    // alignSelf: "center",
    alignItems: "center",
    // textAlign: "center",
    justifyContent: "center",
  },
  bannerText: {
    fontSize: 30,
    // paddingTop: 15,
    position: "absolute",
    // top: ,
    // bottom: 0,
    // width: "100%",
    // padding: 20,
  },
  blurContainer: {
    padding: 20,
    borderRadius: 10,
  },
  Heading: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});
