import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  ButtonText,
  ButtonIcon,
  Heading,
  Text,
  View,
  HStack,
  VStack,
  Fab,
  FabIcon,
  FabLabel,
  Avatar,
  AvatarImage,
  FlatList,
  AddIcon,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Alert,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { DataContext } from "../Utils/DataProvider";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome5 } from "@expo/vector-icons";

import AnimationPlayer from "../Components/AnimationPlayer";

import { Assets, Animations } from "../assets/Assets";

const SwipeableRow = ({ children, onDelete }) => {
  const renderRightActions = () => (
    <Box justifyContent="center">
      <Button onPress={onDelete} height={"100%"} action="negative">
        <ButtonIcon as={FontAwesome5} name="trash" />
      </Button>
    </Box>
  );

  return (
    <Swipeable style={styles.swipeable} renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

const PeopleScreen = ({ navigation }) => {
  const { people, deletePerson } = useContext(DataContext);

  const os = Platform.OS;

  useEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerRight: () => {
        return (
          os == "ios" && (
            <Button
              onPress={() => {
                navigation.navigate("AddPersonScreen");
              }}
              size="sm"
              variant="link"
              action="primary"
            >
              <ButtonText>Add Person</ButtonText>
            </Button>
          )
        );
      },
    });
  }, [navigation]);

  const handleDelete = (personId, name) => {
    Alert.alert(
      "Delete Person",
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deletePerson(personId);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const navigateToIdeas = (id) => {
    navigation.navigate("IdeaScreen", { personId: id });
  };

  const sortedPeople = people.sort((a, b) => {
    return new Date(a.dob) - new Date(b.dob);
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.banner}>
          <ImageBackground
            source={require("../assets/BannerDark.jpeg")}
            resizeMode="cover"
            style={styles.banner}
          />
          <Heading style={styles.bannerText}>My List</Heading>
        </View>
        <View flex={1} style={styles.content}>
          {sortedPeople.length > 0 ? (
            <FlatList
              flex={1}
              data={sortedPeople}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SwipeableRow onDelete={() => handleDelete(item.id, item.name)}>
                  <TouchableOpacity
                    onPress={() => navigateToIdeas(item.id)}
                    style={[styles.row]}
                  >
                    <HStack
                      space="md"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <HStack space="md">
                        <Avatar
                          bgColor="$purple900"
                          size="md"
                          borderRadius="$full"
                        >
                          <AntDesign name="user" size={32} color="white" />
                          {item.photoUri && (
                            <AvatarImage source={{ uri: item.photoUri }} />
                          )}
                        </Avatar>
                        <VStack>
                          <Text fontWeight="$bold">{item.name}</Text>
                          <Text>{item.dob}</Text>
                        </VStack>
                      </HStack>
                      <VStack>
                        <Text>View</Text>
                      </VStack>
                    </HStack>
                  </TouchableOpacity>
                </SwipeableRow>
              )}
            />
          ) : (
            <EmptyPeople navigation={navigation} />
          )}
        </View>
      </SafeAreaView>
      {os == "android" && (
        <Fab
          onPress={() => {
            navigation.navigate("AddPersonScreen");
          }}
          size="md"
          placement="bottom right"
          mb="$5"
        >
          <FabIcon as={AddIcon} mr="$1" />
          <FabLabel>Add person</FabLabel>
        </Fab>
      )}
    </GestureHandlerRootView>
  );
};

function EmptyPeople({ navigation }) {
  return (
    <View style={styles.emptyBody}>
      <Box style={styles.emptyBox}>
        <Heading style>No people saved.</Heading>
        <Text mb={20}>Add a person to get started.</Text>
        <View h={250}>
          <AnimationPlayer
            animation={Animations.sad}
            autoPlay={true}
            loop={false}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate("AddPersonScreen");
          }}
          size="xs"
          variant="outline"
          action="secondary"
          style={styles.button}
        >
          <ButtonText>Add Person</ButtonText>
        </Button>
      </Box>
    </View>
  );
}

export default PeopleScreen;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
  },
  swipeable: { alignItems: "center", flex: 1, width: "100%" },
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
    color: "#fff",
    fontSize: 30,
    position: "absolute",
  },
  button: {
    marginTop: 20,
  },
});
