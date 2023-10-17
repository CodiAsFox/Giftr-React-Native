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
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import GiftrCamera from "../utils/GiftrCamera";

import { useState } from "react";
// import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddPersonScreen() {
  return (
    <View>
      <GiftrCamera />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
