import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { DataContext } from "../../Utils/DataProvider";
import * as FileSystem from "expo-file-system";

const AddIdeaScreen = ({ route, navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const { personId } = route.params;
  const { addIdea } = useContext(DataContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);

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
      console.error("Both text and image are required");
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
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Idea"
          style={{
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
            padding: 10,
          }}
        />
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
        <View style={{ marginTop: 20 }}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddIdeaScreen;
