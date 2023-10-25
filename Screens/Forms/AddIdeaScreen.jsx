import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { MediaButtons } from "../../Components/ImageHandler";
import {
  Box,
  Input,
  Button,
  Text,
  Heading,
  ScrollView,
  InputField,
  VStack,
  Image,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";

import { DataContext } from "../../Utils/DataProvider";
import { useIsFocused } from "@react-navigation/native";
import ErrorMessage from "../../Components/ErrorMessage";

const AddIdeaScreen = ({ route, navigation }) => {
  const [giftIdea, setGiftIdea] = useState("");
  const [usrImage, setUsrImage] = useState(null);
  const [error, setError] = useState(false);
  const { personId } = route.params;
  const { addIdea, getPerson } = useContext(DataContext);
  const isFocused = useIsFocused();
  const [person, setPerson] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: `New gift idea`,
    });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      setPerson(getPerson(personId));
    }
  }, [isFocused]);

  const handleSave = async () => {
    if (!giftIdea || !usrImage) {
      setError(true);
      return;
    }

    const newIdea = {
      id: "",
      giftIdea,
      img: usrImage.uri,
      width: usrImage.width,
      height: usrImage.height,
    };

    await addIdea(personId, newIdea);
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <Box style={styles.body} justifyContent="center">
            <Heading>Add gift for {person.name}</Heading>
            <VStack space="lg" reversed={false}>
              <FormControl isRequired={true}>
                <VStack space="lg" reversed={false}>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Idea name</FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" style={styles.input}>
                    <InputField
                      type="text"
                      value={giftIdea}
                      onChangeText={setGiftIdea}
                      placeholder="Jetpack"
                    />
                  </Input>
                  <FormControlLabel>
                    <FormControlLabelText>
                      {usrImage ? "Replace Image" : "Add Image"}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <MediaButtons setUsrImage={setUsrImage} />

                  <VStack
                    backgroundColor="$teal900"
                    w="100%"
                    h={420}
                    justifyContent="center"
                    alignItems="center"
                    borderRadius={10}
                  >
                    {usrImage ? (
                      <Image
                        source={{ uri: usrImage.uri }}
                        alt="Idea image"
                        role="img"
                        w="100%"
                        h={420}
                        style={{
                          resizeMode: "contain",
                        }}
                      />
                    ) : (
                      <Text>No image selected</Text>
                    )}
                  </VStack>
                </VStack>
              </FormControl>
            </VStack>
            {error && (
              <Box pt={15} pb={10}>
                <ErrorMessage
                  type="error"
                  message="The idea name and photo fields are required."
                />
              </Box>
            )}
            <Button mt={10} action="positive" onPress={handleSave}>
              <ButtonText>Add gift</ButtonText>
            </Button>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddIdeaScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },

  body: {
    paddingTop: 15,
    paddingHorizontal: 25,
  },
});
