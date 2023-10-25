import React from "react";
import { Alert as AlertBox } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Input,
  Button,
  ButtonText,
  Text,
  ScrollView,
  InputField,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  HStack,
  VStack,
  Avatar,
  AvatarImage,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Actionsheet,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  KeyboardAvoidingView,
  Menu,
  MenuItem,
  MenuItemLabel,
  Icon,
  GlobeIcon,
  PuzzleIcon,
  PaintBucket,
  SettingsIcon,
  AddIcon,
  CloseIcon,
  CheckIcon,
  CameraIcon,
  CameraIconOutline,
  CameraIconSolid,
  ImageIcon,
  ImageIconOutline,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Center,
  Heading,
  ButtonGroup,
} from "@gluestack-ui/themed";
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
