import React, {useState, useContext} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {DataContext} from '../../Utils/DataProvider';
import {Userpic} from 'react-native-userpic';
import {MediaButtons} from '../../Components/ImageHandler';

import {
  Layout,
  Avatar,
  Text,
  Input,
  TopNavigation,
  useTheme,
  Button,
} from '@ui-kitten/components';

import DatePicker from 'react-native-modern-datepicker';
import BackButton from '../../Components/BackButton';

const AddPersonScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const {addPerson} = useContext(DataContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const uiTheme = useTheme();

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
      navigation.navigate('PeopleScreen');
    } else {
      setError(true);
    }
  };

  const datePickerOptions = {
    backgroundColor: uiTheme['background-basic-color-3'],
    textHeaderColor: uiTheme['color-danger-hover'],
    textDefaultColor: uiTheme['text-hint-color'],
    selectedTextColor: uiTheme['color-basic-active'],
    mainColor: uiTheme['color-danger-default-border'],
    textSecondaryColor: uiTheme['color-basic-default-border'],
    borderColor: 'rgba(122, 146, 165, 0.1)',
  };

  return (
    <Layout style={{flex: 1}} level="4">
      <TopNavigation
        alignment="center"
        title="Add new person"
        accessoryLeft={() => <BackButton />}
        accessoryRight={() => (
          <Button
            appearance="ghost"
            size="medium"
            status="danger"
            onPress={handleSave}
          >
            Add person
          </Button>
        )}
      />
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            {error && (
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  paddingVertical: 20,
                }}
                status="danger"
                appearance="alternative"
              >
                The name and date of birth fields are required.
              </Text>
            )}
            <Layout
              style={{
                flexDirection: 'row',
                paddingHorizontal: 35,
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <Layout>
                {profilePhoto ? (
                  <Avatar
                    size="large"
                    style={styles.itemImage}
                    source={{uri: profilePhoto.uri}}
                  />
                ) : (
                  <Avatar
                    size="large"
                    style={styles.itemImage}
                    ImageComponent={() => (
                      <Userpic name="User Photo" colorize={true} />
                    )}
                  />
                )}
              </Layout>

              <Layout
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  gap: 15,
                }}
              >
                <Text style={{textAlign: 'center', flex: 1}}>
                  {profilePhoto ? 'Change photo' : 'Add a photo'}
                </Text>
                <MediaButtons setUsrImage={setProfilePhoto} />
              </Layout>
            </Layout>
            <Layout
              level="1"
              style={{
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
                paddingVertical: 20,
                paddingHorizontal: 30,
              }}
            >
              <Text
                style={{paddingBottom: 10}}
                appearance="hint"
                category="label"
              >
                Person's date of birth
              </Text>
              <DatePicker
                onDateChange={setDob}
                value={dob}
                mode="calendar"
                maximumDate={today}
                options={datePickerOptions}
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

  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
