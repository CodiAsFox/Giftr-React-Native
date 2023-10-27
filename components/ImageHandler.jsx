import React, {useState, useEffect} from 'react';
import {Modal, View} from 'react-native';

import {Icon, Layout, Text, Button} from '@ui-kitten/components';
import {Camera, CameraType} from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

function CameraModal({setUsrImage}) {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  const captureImage = async () => {
    if (!camera) return;

    const photo = await camera.takePictureAsync();
    const photoUri = `${FileSystem.documentDirectory}${photo.uri
      .split('/')
      .pop()}`;
    await FileSystem.moveAsync({from: photo.uri, to: photoUri}).then(() => {
      setUsrImage({uri: photoUri});
    });
    setShowModal(false);
  };

  const CameraIcon = (props) => <Icon {...props} name="camera-outline" />;

  const SwitchIcon = (props) => <Icon {...props} name="refresh-outline" />;
  const CloseIcon = (props) => <Icon {...props} name="close" />;
  return (
    <>
      <Button
        status="primary"
        accessoryLeft={CameraIcon}
        onPress={() => setShowModal(true)}
      />
      <Modal animationType="slide" transparent={false} visible={showModal}>
        <View style={{marginTop: 22}}>
          <View>
            <Camera
              type={type}
              ref={(ref) => setCamera(ref)}
              style={{width: '100%', height: '100%'}}
            />
            <Button
              style={{
                flex: 1,
                position: 'absolute',
                top: 55,
                left: 15,
              }}
              status="danger"
              accessoryLeft={CloseIcon}
              onPress={() => {
                setShowModal(!showModal);
              }}
            />

            <Button
              style={{
                flex: 1,
                position: 'absolute',
                top: 55,
                right: 15,
              }}
              status="basic"
              accessoryLeft={SwitchIcon}
              onPress={() => toggleCameraType}
            />

            <Button
              style={{
                flex: 1,
                position: 'absolute',
                bottom: '10%',
                right: '35%',
              }}
              status="success"
              onPress={captureImage}
            >
              Take Photo
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}

function ChosePicture({setUsrImage}) {
  const GalleryIcon = (props) => <Icon {...props} name="image-outline" />;
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
        .split('/')
        .pop()}`;
      await FileSystem.moveAsync({from: media.uri, to: photoUri}).then(() => {
        setUsrImage({uri: photoUri});
      });
    }
  };

  return (
    <Button status="success" accessoryLeft={GalleryIcon} onPress={pickImage} />
  );
}

function MediaButtons({setUsrImage, showCamera = true, showGallery = true}) {
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
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    setHasLibraryAccess(status == 'granted');
  };

  const requestCameraPermission = async () => {
    if (hasCameraPermission) return;
    const {status} = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status == 'granted');
  };

  return (
    <View>
      {showCamera && !hasCameraPermission && (
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            paddingVertical: 20,
          }}
          status="danger"
          appearance="alternative"
        >
          The access to the camera was denied. Go to your phone settings and
          allow Giftr access to the camera.
        </Text>
      )}
      {showGallery && !hasLibraryAccess && (
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            paddingVertical: 20,
          }}
          status="danger"
          appearance="alternative"
        >
          The access to the gallery was denied. Go to your phone settings and
          allow Giftr access to the gallery
        </Text>
      )}
      <Layout
        style={{
          flexDirection: 'row',
          gap: 5,
          justifyContent: 'space-around',
        }}
      >
        {enableCamera && <CameraModal setUsrImage={setUsrImage} />}
        {enableGallery && <ChosePicture setUsrImage={setUsrImage} />}
      </Layout>
    </View>
  );
}

export {CameraModal, ChosePicture, MediaButtons};
