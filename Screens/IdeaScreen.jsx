import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import {
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Text,
  View,
  Image,
  SunIcon,
  MoonIcon,
  HStack,
  VStack,
  Avatar,
  AvatarImage,
  FlatList,
} from "@gluestack-ui/themed";
import { ThemeContext } from "../Utils/ThemeProvider";
import { DataContext } from "../Utils/DataProvider";
import { useIsFocused } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";

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
  const { bannerImg, primaryContentColor, secondContentColor } =
    useContext(ThemeContext);

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  console.log(getPerson(personId));

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
    // await deleteIdea(personId, ideaId);
    // setUpdate((prev) => !prev);

    Alert.alert(
      "Delete Idea", // title
      "Are you sure you want to delete this idea?", // message
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
          source={bannerImg}
          resizeMode="cover"
          style={styles.banner}
        />
        <Heading style={styles.bannerText}></Heading>
      </View>
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
        <Text>Ideas for Person ID: {person.name}</Text>
        {ideas.length > 0 ? (
          <FlatList
            data={ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => handleDelete(item.id)}>
                <View style={{ marginBottom: 10 }}>
                  <Text>{item.text}</Text>
                  <TouchableOpacity onPress={() => handleImagePress(item.img)}>
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
          <Text>No ideas found. Add some!</Text>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddIdeaScreen", { personId })}
        >
          <Text>Add Idea</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IdeaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  emptyBox: {
    alignItems: "center",
    marginTop: -65,
  },
  emptyBody: {
    justifyContent: "center",
    height: "100%",
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
  content: {
    flex: 1,
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
