import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert as AlertBox,
} from "react-native";

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
} from "@gluestack-ui/themed";

import DatePicker from "react-native-modern-datepicker";
import { DataContext } from "../../Utils/DataProvider";
import * as ImagePicker from "expo-image-picker";

const AddPersonScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson } = useContext(DataContext);
  const [photoUri, setPhotoUri] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Add Person",
      headerLeft: () => (
        <Button
          style={{ zIndex: 999 }}
          onPress={() => {
            AlertBox.alert(
              "Discard changes",
              "If you leave now, your changes will be lost.",
              [
                {
                  text: "Exit",
                  onPress: () => {
                    navigation.goBack();
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
          size="md"
          variant="link"
          action="secondary"
        >
          <ButtonText show>Cancel</ButtonText>
        </Button>
      ),
    });
  }, [navigation]);

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
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        {error && (
          <Alert
            mx="$2.5"
            action="error"
            variant="accent"
            style={{ marginTop: 25 }}
          >
            <AlertIcon as={InfoIcon} mr="$3" />
            <AlertText>
              The name and date of birth fields are required.
            </AlertText>
          </Alert>
        )}
        <Box style={styles.body} justifyContent="center">
          <ScrollView>
            <VStack space="lg" reversed={false}>
              <FormControl isRequired={true}>
                <VStack space="lg" reversed={false}>
                  <FormControlLabel isRequired={false}>
                    <FormControlLabelText>
                      Person's picture
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TouchableOpacity onPress={handleClose}>
                    <HStack space="md" alignItems="center">
                      <Avatar
                        bgColor="$amber600"
                        size="lg"
                        borderRadius="$full"
                      >
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
                    style={{
                      borderWidth: 1,
                      marginBottom: 20,
                      padding: 10,
                    }}
                  >
                    <InputField
                      type="text"
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
                    value={dob}
                    mode="calendar"
                    maximumDate={today}
                  />
                </VStack>
              </FormControl>
              <ChosePicture
                showActionsheet={showActionsheet}
                handleClose={handleClose}
                takePhoto={takePhoto}
                pickImage={pickImage}
              />
            </VStack>
          </ScrollView>
          <Button action="positive" size="xs" onPress={handleSave}>
            <ButtonText>Add</ButtonText>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingTop: 50,
  },
  body: {
    paddingTop: 15,
    paddingHorizontal: 25,
  },
});
