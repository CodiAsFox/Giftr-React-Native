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
  Avatar,
  AvatarImage,
  FlatList,
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
    <View>
      <Button onPress={onDelete}>
        <ButtonIcon as={FontAwesome5} name="trash" />
      </Button>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

const PeopleScreen = ({ navigation }) => {
  const { people, deletePerson } = useContext(DataContext);

  useEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate("AddPersonScreen");
          }}
          size="sm"
          variant="link"
          action="secondary"
        >
          <ButtonText>Add Person</ButtonText>
        </Button>
      ),
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
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.banner}>
          <ImageBackground
            source={Assets.banner}
            resizeMode="cover"
            style={styles.banner}
          />
          <Heading style={styles.bannerText}>My List</Heading>
        </View>
        <View style={styles.content}>
          {sortedPeople.length > 0 ? (
            <FlatList
              data={sortedPeople}
              renderItem={({ item }) => (
                <SwipeableRow onDelete={() => handleDelete(item.id, item.name)}>
                  <TouchableOpacity
                    onPress={() => navigateToIdeas(item.id)}
                    style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  >
                    <HStack space="md" justifyContent="space-between">
                      <Avatar
                        bgColor="$amber600"
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
                      <VStack>
                        <Text>View</Text>
                      </VStack>
                    </HStack>
                  </TouchableOpacity>
                </SwipeableRow>
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <EmptyPeople navigation={navigation} />
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

function EmptyPeople({ navigation }) {
  return (
    <View style={styles.emptyBody}>
      <Box style={styles.emptyBox}>
        <Heading style>No people saved.</Heading>
        <Text style={{ marginBottom: 20 }}>Add a person to get started.</Text>
        <View style={{ height: 250 }}>
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
