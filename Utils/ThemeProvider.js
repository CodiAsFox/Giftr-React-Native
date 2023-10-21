import React, { createContext, useState } from "react";

import {
  Box,
  Button,
  ButtonText,
  useColorMode,
  ButtonIcon,
  Heading,
  Text,
  View,
  Image,
  SunIcon,
  MoonIcon,
  HStack,
  VStack,
  Avatar,
  AvatarImage,
  FlatList,
} from "@gluestack-ui/themed";
import { Assets, Animations } from "../assets/Assets";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  let colorMode = useColorMode();
  console.log(colorMode);
  const isDark = colorMode === "dark";
  const colours = {
    bannerImg: isDark ? Assets.Banner.dark : Assets.Banner.light,
    bodyStyle: {
      backgroundColor: isDark ? "black" : "light",
    },
    headerStyle: {
      backgroundColor: isDark ? "#221B05" : "light",
    },
    welcomeBg: isDark
      ? require("../assets/WelcomeDark.png")
      : require("../assets/WelcomeLight.png"),
    toggleLink: isDark ? "Light Mode " : "Dark Mode ",
    toggleIcon: isDark ? SunIcon : MoonIcon,
    primaryContentColor: isDark ? "$trueGray900" : `$white`,
    secondContentColor: isDark ? "$trueGray800" : `$white`,
    textColour: isDark ? "#e0c089" : "#8a2419",
  };

  return (
    <ThemeContext.Provider value={colours}>{children}</ThemeContext.Provider>
  );
};
