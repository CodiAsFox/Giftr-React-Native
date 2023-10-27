import React, {useState, useContext, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {DataContext} from '../../Utils/DataProvider';

import {MediaButtons} from '../../Components/ImageHandler';

import {
  Layout,
  Text,
  Input,
  TopNavigation,
  Button,
} from '@ui-kitten/components';

import BackButton from '../../Components/BackButton';
import {useIsFocused} from '@react-navigation/native';

const AddIdeaScreen = ({route, navigation}) => {
  const [giftIdea, setGiftIdea] = useState('');
  const [ideaImage, setIdeaImage] = useState(null);
  const [error, setError] = useState(false);
  const {personId} = route.params;
  const {addIdea, getPerson} = useContext(DataContext);
  const isFocused = useIsFocused();
  const [person, setPerson] = useState([]);

  useEffect(() => {
    if (isFocused) {
      setPerson(getPerson(personId));
    }
  }, [isFocused, ideaImage]);

  const handleSave = async () => {
    if (!giftIdea || !ideaImage) {
      setError(true);
      return;
    }

    const newIdea = {
      id: '',
      giftIdea,
      img: ideaImage,
    };

    await addIdea(personId, newIdea);
    navigation.navigate('IdeaScreen', {personId: person.id});
  };

  return (
    <Layout style={{flex: 1}} level="4">
      <TopNavigation
        alignment="center"
        title="Add New Idea"
        subtitle={person.name}
        accessoryLeft={() => <BackButton />}
        accessoryRight={() => (
          <Button
            appearance="ghost"
            size="medium"
            status="success"
            onPress={handleSave}
          >
            Save idea
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
                The idea name and photo fields are required.
              </Text>
            )}

            <Layout
              level="2"
              style={{
                paddingVertical: 20,
                paddingHorizontal: 30,
              }}
            >
              <Input
                style={styles.input}
                value={giftIdea}
                label="Gift idea name"
                placeholder="Flying car"
                onChangeText={(nextValue) => setGiftIdea(nextValue)}
              />
            </Layout>

            <Layout
              level="4"
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 20,
                alignItems: 'center',
              }}
            >
              <Text>{ideaImage ? 'Change photo' : 'Add a photo'}</Text>
              <MediaButtons setUsrImage={setIdeaImage} />
            </Layout>

            <Layout
              style={{
                flexDirection: 'row',

                paddingHorizontal: 35,
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}
              level="1"
            >
              <Layout
                level="3"
                style={{
                  width: '100%',
                  height: 420,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginVertical: 20,
                }}
              >
                {ideaImage ? (
                  <Image
                    source={{uri: ideaImage.uri}}
                    alt="Idea image"
                    role="img"
                    style={{
                      width: '100%',
                      height: 420,
                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <Text>No image selected</Text>
                )}
              </Layout>
            </Layout>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Layout>
  );
};

export default AddIdeaScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});
