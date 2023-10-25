import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Modal,
} from "react-native";

import {
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Image,
  Text,
  View,
  HStack,
  VStack,
  FlatList,
} from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import AnimationPlayer from "../Components/AnimationPlayer";

import { Assets, Animations } from "../assets/Assets";
import { DataContext } from "../Utils/DataProvider";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons, Entypo } from "@expo/vector-icons";

const IdeaScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { personId } = route.params;
  const [person, setPerson] = useState([]);
  const { getPerson, getIdeas, deleteIdea } = useContext(DataContext);
  const [ideas, setIdeas] = useState([]);
  const [update, setUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: `${person.name}'s Ideas`,
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate("AddIdeaScreen", { personId });
          }}
          size="sm"
          variant="link"
          action="secondary"
        >
          <ButtonText>Add Idea</ButtonText>
        </Button>
      ),
      headerLeft: () => (
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          size="md"
          variant="link"
          action="secondary"
        >
          <ButtonIcon as={Ionicons} name="chevron-back" />
          <ButtonText show>My list</ButtonText>
        </Button>
      ),
    });
  }, [navigation, person]);

  const handleImagePress = (imageUri, giftName) => {
    setSelectedImage(imageUri);
    setSelectedGift(giftName);
    setModalVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      setPerson(getPerson(personId));
      const fetchData = async () => {
        const fetchedIdeas = await getIdeas(personId);
        setIdeas(fetchedIdeas);
      };
      fetchData();
    }
  }, [isFocused, update]);

  const handleDelete = async (ideaId, giftIdea) => {
    Alert.alert(
      `Delete ${giftIdea}`,
      "Are you sure you want to delete this idea?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteIdea(personId, ideaId);
            setUpdate((prev) => !prev);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground
          source={Assets.banner}
          resizeMode="cover"
          style={styles.banner}
        />
        <Heading style={styles.bannerText}>{person.name}'s Gift List</Heading>
      </View>

      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedImage={selectedImage}
        giftName={selectedGift}
      />
      <View style={styles.content}>
        {ideas.length > 0 ? (
          <FlatList
            data={ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <HStack
                space="md"
                justifyContent="space-between"
                alignItems="center"
                alignContent="center"
                style={styles.row}
              >
                <TouchableOpacity
                  onPress={() => handleImagePress(item.img, item.giftIdea)}
                >
                  <HStack space="lg" alignItems="center">
                    <Image
                      role="img"
                      source={{ uri: item.img }}
                      alt={`${item.giftIdea} image`}
                      w={50}
                      h={50}
                    />

                    <VStack>
                      <Heading pt="$0" fontWeight="$bold">
                        {item.giftIdea}
                      </Heading>
                      <Text pt="$0">View Photo</Text>
                    </VStack>
                  </HStack>
                </TouchableOpacity>
                <Button
                  onPress={() => handleDelete(item.id, item.giftIdea)}
                  action="negative"
                  variant="link"
                >
                  <ButtonIcon
                    as={Entypo}
                    name="circle-with-cross"
                    color="$red"
                  />
                </Button>
              </HStack>
            )}
          />
        ) : (
          <EmptyGifs navigation={navigation} person={person} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default IdeaScreen;

function ModalImage({
  modalVisible = false,
  setModalVisible,
  selectedImage,
  giftName,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <BlurView intensity={35} tint="light" style={styles.blurContainer}>
        <VStack
          justifyContent="space-around"
          alignItems="center"
          pt={45}
          pb={45}
          flex={1}
        >
          <Heading style={styles.modalText}>{giftName}</Heading>
          <Image
            role="img"
            alt=""
            source={{ uri: selectedImage }}
            w="100%"
            h={450}
            style={{ resizeMode: "contain" }}
          />
          <Button onPress={() => setModalVisible(!modalVisible)}>
            <ButtonText>Close</ButtonText>
          </Button>
        </VStack>
      </BlurView>
    </Modal>
  );
}

function EmptyGifs({ navigation, person }) {
  return (
    <View style={styles.content}>
      <View style={styles.emptyBody}>
        <Box style={styles.emptyBox}>
          <Heading style>{person.name} has no ideas saved.</Heading>
          <Text mb={20}>Add a one to get your gift list started.</Text>
          <View h={250}>
            <AnimationPlayer
              animation={Animations.sad}
              autoPlay={true}
              loop={false}
            />
          </View>
          <Button
            onPress={() => {
              navigation.navigate("AddIdeaScreen", { personId: person.id });
            }}
            size="xs"
            variant="outline"
            action="secondary"
            style={styles.button}
          >
            <ButtonText>Add Idea</ButtonText>
          </Button>
        </Box>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  emptyBox: {
    alignItems: "center",
    marginTop: -65,
  },
  emptyBody: {
    justifyContent: "center",
    height: "90%",
  },
  banner: {
    left: 0,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    fontSize: 30,
    position: "absolute",
  },

  blurContainer: {
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },

  button: {
    marginTop: 20,
  },

  modalText: {
    textAlign: "center",
    fontSize: 30,
    color: "#000",
  },
});
