import React from "react";
import { Alert as AlertBox } from "react-native";

import { Button, ButtonText } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const nav = useNavigation();
  return (
    <Button
      style={{ zIndex: 999 }}
      size="md"
      variant="link"
      action="secondary"
      onPress={() => {
        AlertBox.alert(
          "Discard changes?",
          "Any unsaved changes will be discarded. Are you sure you want to exit?",
          [
            {
              text: "Exit",
              onPress: () => {
                nav.goBack();
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
    >
      <ButtonText show>Cancel</ButtonText>
    </Button>
  );
}
