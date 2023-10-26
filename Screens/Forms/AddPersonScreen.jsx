import React, {useState, useContext, useEffect} from 'react';

import {AntDesign} from '@expo/vector-icons';

import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {DataContext} from '../../Utils/DataProvider';

import {ThemeContext} from '../../Utils/ThemeProvider';

import {
  Divider,
  Icon,
  Layout,
  Popover,
  Text,
  Input,
  TopNavigation,
  Button,
  Spinner,
} from '@ui-kitten/components';

import DatePicker from 'react-native-modern-datepicker';
import BackButton from '../../Components/BackButton';
// import ErrorMessage from '../../Components/ErrorMessage';

const AddPersonScreen1 = ({navigation}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const {addPerson} = useContext(DataContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState(false);

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
                        <AvatarImage source={{uri: profilePhoto.uri}} />
                      )}
                    </Avatar>
                    <VStack space="md" flex={1}>
                      <Text>
                        {profilePhoto ? 'Change photo' : 'Add a photo'}
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

const AddPersonScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const {addPerson} = useContext(DataContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [visible, setVisible] = React.useState(false);

  const handleSave = () => {
    if (name && dob) {
      const newPerson = {
        id: '',
        name,
        dob,
        profilePhoto: profilePhoto ? profilePhoto : undefined,
        ideas: [],
      };

      addPerson(newPerson);
      navigation.goBack();
    } else {
      setVisible(true);
    }
  };

  const SavePerson = () => {
    const personBtn = () => (
      <Button
        appearance="ghost"
        size="medium"
        status="danger"
        onPress={handleSave}
      >
        Add person
      </Button>
    );

    return (
      <Popover
        visible={visible}
        anchor={personBtn}
        fullWidth={true}
        onBackdropPress={() => setVisible(false)}
      >
        <Layout style={styles.content}>
          <Text>Person's name and date of birth are required.</Text>
        </Layout>
      </Popover>
    );
  };

  return (
    <Layout style={{flex: 1}} level="4">
      <TopNavigation
        alignment="center"
        title="Add new person"
        accessoryLeft={() => <BackButton />}
        accessoryRight={() => <SavePerson />}
      />
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <Layout
              level="1"
              style={{
                // flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 30,
              }}
            >
              <Input
                value={name}
                label="Person's name"
                placeholder="John Doe"
                onChangeText={(nextValue) => setName(nextValue)}
              />
            </Layout>
            <Layout
              level="2"
              style={{
                // flex: 1,
                paddingVertical: 20,
                paddingHorizontal: 30,
              }}
            >
              <Text category="label">Person's date of birth</Text>
              <DatePicker
                onDateChange={setDob}
                value={dob}
                mode="calendar"
                maximumDate={today}
              />
            </Layout>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
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
  title: {
    textAlign: 'center',
    // alignContent: 'center',
    // justifyContent: 'center',
    paddingVertical: 20,
  },
});
