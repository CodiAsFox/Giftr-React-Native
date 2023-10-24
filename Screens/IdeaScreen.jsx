import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Image,
  Text,
  View,
  Modal,
  HStack,
  VStack,
  Avatar,
  AvatarImage,
  FlatList,
} from "@gluestack-ui/themed";
import AnimationPlayer from "../Components/AnimationPlayer";

import { Assets, Animations } from "../assets/Assets";
import { DataContext } from "../Utils/DataProvider";
import { useIsFocused } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";

const SwipeableRow = ({ children, onDelete }) => {
  const renderRightActions = () => (
    <View>
      <Button title="Delete" onPress={onDelete} />
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

const IdeaScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { personId } = route.params;
  const [person, setPerson] = useState([]);
  const { getPerson, getIdeas, deleteIdea } = useContext(DataContext);
  const [ideas, setIdeas] = useState([]);
  const [update, setUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
          style={{ zIndex: 999 }}
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

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
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

  const handleDelete = async (ideaId) => {
    Alert.alert("Delete Idea", "Are you sure you want to delete this idea?", [
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
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <Modal
          visible={modalVisible}
          style={{ flex: 1, width: 20, height: 20 }}
          onRequestClose={() => setModalVisible(false)}
        >
          <Button onPress={() => setModalVisible(false)} title="Close"></Button>
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 15, height: 15 }}
          />
        </Modal>
        <View style={styles.content}>
          {ideas.length > 0 ? (
            <FlatList
              data={ideas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SwipeableRow onDelete={() => handleDelete(item.id)}>
                  <View style={{ marginBottom: 10 }}>
                    <Text>{item.text}</Text>
                    <TouchableOpacity
                      onPress={() => handleImagePress(item.img)}
                    >
                      <Image
                        source={{ uri: item.img }}
                        style={{ width: 50, height: 50 }}
                      />
                    </TouchableOpacity>
                  </View>
                </SwipeableRow>
              )}
            />
          ) : (
            <EmptyGifs navigation={navigation} person={person} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IdeaScreen;

function EmptyGifs({ navigation, person }) {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.banner}>
          <ImageBackground
            source={Assets.banner}
            resizeMode="cover"
            style={styles.banner}
          />
          <Heading style={styles.bannerText}>{person.name}'s gift list</Heading>
        </View>
        <View style={styles.content}>
          <View style={styles.emptyBody}>
            <Box style={styles.emptyBox}>
              <Heading style>{person.name} has no ideas saved.</Heading>
              <Text style={{ marginBottom: 20 }}>
                Add a one to get your gift list started.
              </Text>
              <View style={{ height: 250 }}>
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
  },
  Heading: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});
