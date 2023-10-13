import {
  Box,
  Button,
  ButtonText,
  GluestackUIProvider,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { config } from "./config/gluestack-ui.config";
export default function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <GluestackUIProvider colorMode={theme} config={config}>
      <Box
        justifyContent="center"
        alignItems="center"
        h="100%"
        sx={{
          _dark: {
            bg: "$light900",
          },
          _light: {
            bg: "$light200",
          },
        }}
      >
        <Button
          sx={{
            _dark: {
              bg: "$red400",
            },
            _light: {
              bg: "$red600",
            },
          }}
        >
          <ButtonText>Hello world</ButtonText>
        </Button>
        <Button
          onPress={() => {
            setTheme(theme == "light" ? "dark" : "light");
          }}
        >
          <ButtonText>Toggle Theme</ButtonText>
        </Button>
      </Box>
    </GluestackUIProvider>
  );
}