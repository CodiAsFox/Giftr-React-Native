import React, { useContext } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../Utils/ThemeProvider";
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

import { useColorMode } from "@gluestack-ui/themed";
import AnimationPlayer from "../Components/AnimationPlayer";
import { Ionicons } from "@expo/vector-icons";

import { Assets, Animations } from "../assets/Assets";

const SwipeableRow = ({ children, onDelete }) => {
  const renderRightActions = () => (
    <View>
      <Button onPress={onDelete}>
        <ButtonText>Delete</ButtonText>
        <ButtonIcon as={FontAwesome5} name="trash" />
      </Button>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>
  );
};

const PeopleScreen = ({ navigation }) => {
  const colorMode = useColorMode();

  const { people, deletePerson } = useContext(DataContext);
  const { bannerImg, primaryContentColor, secondContentColor } =
    useContext(ThemeContext);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
        <ImageBackground
          source={bannerImg}
          resizeMode="cover"
          style={styles.banner}
        />
        <Heading style={styles.bannerText}>My List</Heading>
      </View>
      <View style={styles.content}>
        {sortedPeople.length > 0 ? (
          <FlatList
            data={sortedPeople}
            style={{ flex: 1 }}
            backgroundColor={primaryContentColor}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => handleDelete(item.id, item.name)}>
                <Box
                  borderBottomWidth="$1"
                  borderColor="$trueGray800"
                  backgroundColor={secondContentColor}
                  sx={{
                    _dark: {
                      borderColor: "$trueGray100",
                    },
                    "@base": {
                      pl: 0,
                      pr: 0,
                    },
                    "@sm": {
                      pl: "$4",
                      pr: "$5",
                    },
                  }}
                  py="$2"
                >
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
                        <Text
                          color="$coolGray800"
                          fontWeight="$bold"
                          sx={{
                            _dark: {
                              color: "$warmGray100",
                            },
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          color="$coolGray600"
                          sx={{
                            _dark: {
                              color: "$warmGray200",
                            },
                          }}
                        >
                          {item.recentText}
                        </Text>
                      </VStack>
                      <Text
                        fontSize="$xs"
                        color="$coolGray800"
                        alignSelf="flex-start"
                        sx={{
                          _dark: {
                            color: "$warmGray100",
                          },
                        }}
                      >
                        {item.dob}
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                </Box>
              </SwipeableRow>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <EmptyPeople navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
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
          <ButtonText>Add Person </ButtonText>
          <ButtonIcon as={Ionicons} name="ios-person-add" />
        </Button>
      </Box>
    </View>
  );
}

export default PeopleScreen;

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
