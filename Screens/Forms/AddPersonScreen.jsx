import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Input,
  Button,
  ButtonText,
  Text,
  ScrollView,
  InputField,
  HStack,
  VStack,
  Avatar,
  AvatarImage,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import { MediaButtons } from "../../Components/ImageHandler";
import DatePicker from "react-native-modern-datepicker";
import { DataContext } from "../../Utils/DataProvider";

import ErrorMessage from "../../Components/ErrorMessage";

const AddPersonScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson } = useContext(DataContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Add Person",
    });
  }, [navigation]);

  const handleSave = () => {
    if (name && dob) {
      const newPerson = {
        id: "",
        name,
        dob,
        profilePhoto: profilePhoto ? profilePhoto : undefined,
        ideas: [],
      };

      addPerson(newPerson);
      navigation.goBack();
    } else {
      setError(true);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <VStack
            style={styles.body}
            justifyContent="space-between"
            alignContent="space-between"
          >
            <VStack space="lg" reversed={false}>
              <FormControl isRequired={true}>
                <VStack space="lg" reversed={false}>
                  <FormControlLabel isRequired={false}>
                    <FormControlLabelText>
                      Person's picture
                    </FormControlLabelText>
                  </FormControlLabel>

                  <HStack space="lg" alignItems="center">
                    <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                      <AntDesign name="user" size={32} color="white" />
                      {profilePhoto && (
                        <AvatarImage source={{ uri: profilePhoto.uri }} />
                      )}
                    </Avatar>
                    <VStack space="md" flex={1}>
                      <Text>
                        {profilePhoto ? "Change photo" : "Add a photo"}
                      </Text>
                      <MediaButtons setUsrImage={setProfilePhoto} />
                    </VStack>
                  </HStack>

                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Person's name</FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" style={styles.input}>
                    <InputField
                      type="text"
                      value={name}
                      onChangeText={setName}
                      placeholder="John Doe"
                    />
                  </Input>
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Date of Birth</FormControlLabelText>
                  </FormControlLabel>
                  <DatePicker
                    onDateChange={setDob}
                    value={dob}
                    mode="calendar"
                    maximumDate={today}
                  />
                </VStack>
              </FormControl>
            </VStack>
            {error && (
              <Box pt={15} pb={10}>
                <ErrorMessage
                  type="error"
                  message="The name and date of birth fields are required."
                />
              </Box>
            )}
            <Button mt={10} action="positive" onPress={handleSave}>
              <ButtonText>Add person</ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPersonScreen;

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
