import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ErrorMessage from "./ErrorMessage";
import {
  Box,
  Button,
  ButtonIcon,
  View,
  ButtonText,
  HStack,
} from "@gluestack-ui/themed";

import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

function CameraModal({ setUsrImage }) {
  const [showModal, setShowModal] = useState(false);
  const [camera, setCamera] = useState(null);
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const captureImage = async () => {
    if (!camera) return;

    const photo = await camera.takePictureAsync();
    const photoUri = `${FileSystem.documentDirectory}${photo.uri
      .split("/")
      .pop()}`;
    await FileSystem.moveAsync({ from: photo.uri, to: photoUri }).then(() => {
      setUsrImage({ uri: photoUri });
    });
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant="solid"
        action="primary"
        size="sm"
        flex={1}
        // style={{ width: "100%" }}
        onPress={() => setShowModal(true)}
      >
        <ButtonIcon as={Ionicons} name="camera" size={25} />
      </Button>
      <Modal animationType="slide" transparent={false} visible={showModal}>
        <View style={{ marginTop: 22 }}>
          <View>
            <Camera
              ref={(ref) => setCamera(ref)}
              style={{ width: "100%", height: "100%" }}
            />
            <Button
              style={{
                top: 55,
                left: 15,
              }}
              size="sm"
              variant="solid"
              action="secondary"
              justifyContent="center"
              position="absolute"
              zIndex={999}
              onPress={() => {
                setShowModal(!showModal);
              }}
            >
              <ButtonIcon as={Ionicons} name="md-close-circle" />
            </Button>
            <Button
              style={{
                top: 55,
                right: 15,
              }}
              size="sm"
              variant="solid"
              action="secondary"
              justifyContent="center"
              position="absolute"
              zIndex={999}
              onPress={() => toggleCameraType}
            >
              <ButtonIcon as={Ionicons} name="camera-reverse-outline" />
            </Button>
            <Button
              style={{
                bottom: "10%",
                right: "32%",
              }}
              zIndex={999}
              variant="solid"
              position="absolute"
              size="lg"
              rounded="$full"
              action="primary"
              onPress={captureImage}
            >
              <ButtonText>Take Photo</ButtonText>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

function ChosePicture({ setUsrImage }) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const media = result.assets[0];
      const photoUri = `${FileSystem.documentDirectory}${media.uri
        .split("/")
        .pop()}`;
      await FileSystem.moveAsync({ from: media.uri, to: photoUri }).then(() => {
        setUsrImage({ uri: photoUri });
      });
    }
  };

  return (
    <Button
      variant="solid"
      size="sm"
      action="secondary"
      onPress={pickImage}
      flex={1}
      // style={{ width: auto }}
    >
      <ButtonIcon as={Ionicons} name="ios-albums" size={25} />
    </Button>
  );
}

function MediaButtons({ setUsrImage, showCamera = true, showGallery = true }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasLibraryAccess, setHasLibraryAccess] = useState(false);
  const [enableCamera, setEnableCamera] = useState(false);
  const [enableGallery, setEnableGallery] = useState(false);

  useEffect(() => {
    requestCameraPermission();
    requestGalleryPemission();
  }, []);

  useEffect(() => {
    if (hasCameraPermission) {
      setEnableCamera(showCamera);
    }
    if (hasLibraryAccess) {
      setEnableGallery(showGallery);
    }
  }, [hasCameraPermission, hasLibraryAccess]);

  const requestGalleryPemission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    setHasLibraryAccess(status == "granted");
  };

  const requestCameraPermission = async () => {
    if (hasCameraPermission) return;
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status == "granted");
  };

  return (
    <Box>
      {showCamera && !hasCameraPermission && (
        <ErrorMessage
          padding="md"
          type="error"
          message="The access to the gallery was denied. Go to your phone settings and allow Giftr access to the gallery."
        />
      )}
      {showGallery && !hasLibraryAccess && (
        <ErrorMessage
          padding="md"
          type="error"
          message="The access to the gallery was denied. Go to your phone settings and allow Giftr access to the gallery."
        />
      )}
      <HStack space="lg" pt="$4">
        {enableCamera && <CameraModal setUsrImage={setUsrImage} />}
        {enableGallery && <ChosePicture setUsrImage={setUsrImage} />}
      </HStack>
    </Box>
  );
}

export { CameraModal, ChosePicture, MediaButtons };
