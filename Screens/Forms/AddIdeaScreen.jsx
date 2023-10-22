import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert as AlertBox,
} from "react-native";
import {
  Box,
  Input,
  Button,
  ButtonText,
  Text,
  ScrollView,
  InputField,
  Alert,
  View,
  AlertIcon,
  AlertText,
  InfoIcon,
  HStack,
  VStack,
  Avatar,
  Image,
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
import { Camera } from "expo-camera";
import { DataContext } from "../../Utils/DataProvider";
import * as FileSystem from "expo-file-system";

const AddIdeaScreen = ({ route, navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const [person, setPerson] = useState([]);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const { personId } = route.params;
  const { getPerson, addIdea } = useContext(DataContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Add Person",
      headerRight: () => (
        <Button action="positive" size="xs" onPress={handleSave}>
          <ButtonText>Add Idea</ButtonText>
        </Button>
      ),
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

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const handleSave = async () => {
    if (text && image) {
      const newIdea = {
        id: "",
        text,
        img: image.uri,
        width: image.width,
        height: image.height,
      };
      await addIdea(personId, newIdea);
      navigation.goBack();
    } else {
      setError(true);
    }
  };

  const handleCapture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const newUri = FileSystem.documentDirectory + photo.uri.split("/").pop();
      await FileSystem.moveAsync({
        from: photo.uri,
        to: newUri,
      });
      setImage({ uri: newUri, width: photo.width, height: photo.height });
    }
  };

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
            <AlertText>The idea name and photo fields are required.</AlertText>
          </Alert>
        )}
        <Box style={styles.body} justifyContent="center">
          <ScrollView>
            <VStack space="lg" reversed={false}>
              <FormControl isRequired={true}>
                <VStack space="lg" reversed={false}>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Idea</FormControlLabelText>
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
                      value={text}
                      onChangeText={setText}
                      placeholder="Awesome shoes"
                    />
                  </Input>
                  {image ? (
                    <Image
                      source={{ uri: image.uri }}
                      style={{ width: 300, height: 200 }}
                    />
                  ) : (
                    <Camera
                      ref={(ref) => setCamera(ref)}
                      style={{ width: 200, height: 300 }}
                      ratio="2:3"
                    />
                  )}
                  {!image && <Button title="Capture" onPress={handleCapture} />}
                </VStack>
              </FormControl>
            </VStack>
          </ScrollView>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddIdeaScreen;
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
