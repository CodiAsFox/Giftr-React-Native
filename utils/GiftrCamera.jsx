import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import {
  Box,
  Button,
  View,
  ButtonText,
  ButtonIcon,
  Heading,
  Image,
  SunIcon,
  MoonIcon,
} from "@gluestack-ui/themed";

export default function GiftrCamera() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log(image);
  return (
    <View>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      ></Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      {image && <Image source={{ uri: image }} />}
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
