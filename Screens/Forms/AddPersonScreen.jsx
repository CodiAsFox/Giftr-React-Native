import React, { useState, useContext } from "react";
import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Input,
  Button,
  ButtonText,
  ButtonIcon,
  AvatarBadge,
  AvatarFallbackText,
  Heading,
  Text,
  View,
  InputField,
  Image,
  SunIcon,
  MoonIcon,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  HStack,
  VStack,
  Icon,
  User,
  Avatar,
  AvatarImage,
  ButtonGroup,
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
  FlatList,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import { Camera as CameraIcon } from "lucide-react-native";
import DatePicker from "react-native-modern-datepicker";
import { DataContext } from "../../Utils/DataProvider";
import * as ImagePicker from "expo-image-picker";

const AddPersonScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson } = useContext(DataContext);
  const [photoUri, setPhotoUri] = useState(null);
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (name && dob) {
      const newPerson = {
        id: "",
        name,
        dob,
        photoUri: photoUri ? photoUri : undefined,
        ideas: [],
      };
      addPerson(newPerson);
      navigation.goBack();
    } else {
      setError(true);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      handleClose();
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      handleClose();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {error && (
        <Alert mx="$2.5" action="error" variant="accent">
          <AlertIcon as={InfoIcon} mr="$3" />
          <AlertText>
            We have updated our terms of service. Please review and accept to
            continue using our service.
          </AlertText>
        </Alert>
      )}
      <Box style={{ paddingHorizontal: 25 }} justifyContent="center">
        <VStack space="lg" reversed={false}>
          <FormControl isRequired={true}>
            <VStack space="lg" reversed={false}>
              <FormControlLabel isRequired={false}>
                <FormControlLabelText>Person's picture</FormControlLabelText>
              </FormControlLabel>
              <TouchableOpacity onPress={handleClose}>
                <HStack space="md">
                  <Avatar bgColor="$amber600" size="lg" borderRadius="$full">
                    <AntDesign name="user" size={32} color="white" />
                    {photoUri && <AvatarImage source={{ uri: photoUri }} />}
                  </Avatar>
                  <Text>{photoUri ? "Change photo" : "Add a photo"}</Text>
                </HStack>
              </TouchableOpacity>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Person's name</FormControlLabelText>
              </FormControlLabel>
              <Input
                variant="outline"
                isRequired={true}
                style={{
                  borderWidth: 1,
                  marginBottom: 20,
                  padding: 10,
                }}
              >
                <InputField
                  value={name}
                  onChangeText={setName}
                  placeholder="John Doe"
                />
              </Input>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Date of Birth</FormControlLabelText>
              </FormControlLabel>
              <DatePicker
                onDateChange={setDob}
                mode="calendar"
                maximumDate={today}
                options={{
                  backgroundColor: "#090C08",
                  textHeaderColor: "#FFA25B",
                  textDefaultColor: "#F6E7C1",
                  selectedTextColor: "#fff",
                  mainColor: "#F4722B",
                  textSecondaryColor: "#D6C7A1",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
              />
            </VStack>
          </FormControl>
          <ChosePicture
            showActionsheet={showActionsheet}
            handleClose={handleClose}
            takePhoto={takePhoto}
            pickImage={pickImage}
          />
          <Button action="positive" onPress={handleSave}>
            <ButtonText>Save</ButtonText>
          </Button>
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

function ChosePicture({ showActionsheet, handleClose, takePhoto, pickImage }) {
  return (
    <Box>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent style={{ paddingBottom: 40 }} zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={takePhoto}>
            <ActionsheetItemText>Take Picture</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={pickImage}>
            <ActionsheetItemText>Chose from Gallery</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>Cancel</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}

export default AddPersonScreen;
