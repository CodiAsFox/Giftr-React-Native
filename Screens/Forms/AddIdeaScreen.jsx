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
  Text,
  Heading,
  ScrollView,
  Alert,
  VStack,
  Image,
  ButtonGroup,
  ThreeDotsIcon,
  ButtonIcon,
  ButtonText,
  KeyboardAvoidingView,
  HStack,
} from "@gluestack-ui/themed";
import { Camera } from "expo-camera";
import { DataContext } from "../../Utils/DataProvider";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

const AddIdeaScreen = ({ route, navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [error, setError] = useState(false);

  const { personId } = route.params;
  const { addIdea } = useContext(DataContext);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const handleSave = async () => {
    if (!text || !image) {
      setError(true);
      return;
    }

    const newIdea = {
      id: "",
      text,
      img: image.uri,
      width: image.width,
      height: image.height,
    };

    await addIdea(personId, newIdea);
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const newUri = `${FileSystem.documentDirectory}${result.uri
        .split("/")
        .pop()}`;
      await FileSystem.moveAsync({ from: result.uri, to: newUri });
      setImage({ uri: newUri, width: result.width, height: result.height });
    }
  };

  const captureImage = async () => {
    console.log(image);

    if (image) {
      setImage(null);
      return;
    }
    if (!camera) return;

    const photo = await camera.takePictureAsync();
    const newUri = `${FileSystem.documentDirectory}${photo.uri
      .split("/")
      .pop()}`;
    await FileSystem.moveAsync({ from: photo.uri, to: newUri });

    console.log(newUri);
    setImage({ uri: newUri, width: photo.width, height: photo.height });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        {error && (
          <Alert>
            <Text>The idea name and photo fields are required.</Text>
          </Alert>
        )}
        <Box>
          <ScrollView>
            <VStack>
              <Text>Idea</Text>
              <Input
                value={text}
                onChangeText={setText}
                placeholder="Awesome shoes"
              />
              {image ? (
                <Image
                  source={{ uri: image.uri }}
                  alt="Idea image"
                  style={{ width: "100%", height: 450, resizeMode: "contain" }}
                />
              ) : (
                <Camera
                  ref={(ref) => setCamera(ref)}
                  style={{ width: "100%", height: 400, resizeMode: "contain" }}
                />
              )}

              <Heading>{image ? "Replace Image" : "Add Image"}</Heading>
              <HStack space="md" justifyContent="space-between">
                <Button
                  variant="solid"
                  size="lg"
                  action="primary"
                  onPress={captureImage}
                >
                  <ButtonText>
                    {image ? "From Camera" : "Take Photo"}
                  </ButtonText>
                </Button>
                <Button
                  variant="solid"
                  size="lg"
                  action="secondary"
                  onPress={pickImage}
                >
                  <ButtonText>Gallery</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </ScrollView>
          <Button onPress={handleSave}>
            <Text>Add Idea</Text>
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddIdeaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  body: { paddingTop: 15, paddingHorizontal: 25 },
});
