import React from "react";
import {
  Actionsheet,
  ButtonText,
  ButtonIcon,
  Box,
  ActionsheetContent,
  Button,
  ActionsheetBackdrop,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItemText,
  SunIcon,
  MoonIcon,
  ActionsheetItem,
} from "@gluestack-ui/themed";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useColorMode } from "@gluestack-ui/themed";
import { storeData, getData } from "../utils/Storage";
export default function Settings({ setTheme }) {
  const colorMode = useColorMode();
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  switch (colorMode) {
    case "dark":
      toggleLink = "Light Mode ";
      toggleIcon = SunIcon;
      color = "#e0c089";
      break;
    default:
      toggleLink = "Dark Mode ";
      toggleIcon = MoonIcon;
      color = "#8a2419";
      break;
  }

  return (
    <Box style={styles.container}>
      <BlurView intensity={50} tint={colorMode} style={styles.blurContainer}>
        <Button
          onPress={handleClose}
          size="xs"
          variant="outline"
          action="secondary"
        >
          <Ionicons name="ios-settings" size={18} color={color} />
        </Button>
      </BlurView>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$75" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem
            onPress={() => {
              setTheme(colorMode === "dark" ? "light" : "dark");
            }}
          >
            <ActionsheetItemText>
              {toggleLink} <ButtonIcon as={toggleIcon} />
            </ActionsheetItemText>
          </ActionsheetItem>
          {/* <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Sync</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Play</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Favourite</ActionsheetItemText>
          </ActionsheetItem> */}
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Delete Evrything</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Close</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // left: 0,
    // top: 60,
  },
  blurContainer: {
    // position: "absolute",
    width: "auto",
    padding: 0,
    margin: 0,
    left: 10,
  },
});
