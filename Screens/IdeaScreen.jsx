import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Modal} from 'react-native';

import {
  Divider,
  Icon,
  Avatar,
  Layout,
  Text,
  TopNavigation,
  Button,
  Spinner,
} from '@ui-kitten/components';
import {BlurView} from 'expo-blur';
import AnimationPlayer from '../Components/AnimationPlayer';
import {ThemeContext} from '../Utils/ThemeProvider';
import {Animations} from '../assets/Assets';
import {DataContext} from '../Utils/DataProvider';
import {useIsFocused} from '@react-navigation/native';
import {Userpic} from 'react-native-userpic';
import IdeaList from '../Components/Lists/IdeaList';

const IdeaScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const {personId} = route.params;
  const [person, setPerson] = useState([]);
  const {getPerson, getIdeas, isLoading} = useContext(DataContext);
  const [ideas, setIdeas] = useState([]);
  const [update, setUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);

  const {theme} = useContext(ThemeContext);

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

  const handleImagePress = (imageUri, giftName) => {
    setSelectedImage(imageUri);
    setSelectedGift(giftName);
    setModalVisible(true);
  };

  return (
    <Layout style={{flex: 1}}>
      <ModalImage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedImage={selectedImage}
        giftName={selectedGift}
        theme={theme}
      />
      <SafeAreaView style={{flex: 1}}>
        <IdeaHeader navigation={navigation} person={person} />
        <Divider />
        <Layout
          style={{
            flex: 1,
          }}
        >
          {isLoading ? (
            <Layout style={styles.spinnerContainer} level="1">
              <View style={styles.controlContainer}>
                <Spinner status="control" />
              </View>
            </Layout>
          ) : ideas.length >= 1 ? (
            <IdeaList
              ideas={ideas}
              handleImagePress={handleImagePress}
              person={person}
              setUpdate={setUpdate}
            />
          ) : (
            <EmptyGifs navigation={navigation} person={person} />
          )}
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

function IdeaHeader({navigation, person}) {
  const RenderTitle = (props) => {
    const userPicture = person.photoUri ? person.photoUri : '/';
    return (
      <View style={styles.titleContainer}>
        <Avatar
          {...props}
          style={styles.logo}
          ImageComponent={() => (
            <Userpic
              source={{uri: userPicture}}
              colorize={true}
              name={person.name}
            />
          )}
        />
        <View style={{marginLeft: 5}}>
          <Text category="label" {...props}>
            {props.name}
          </Text>
          <Text category="s2" appearance="hint">
            Gift list
          </Text>
        </View>
      </View>
    );
  };

  const BackIcon = (props) => <Icon {...props} name="arrow-back-outline" />;
  const AddIcon = (props) => <Icon {...props} name="plus-outline" />;
  return (
    <TopNavigation
      title={(props) => <RenderTitle props={props} name={person.name} />}
      accessoryLeft={() => (
        <Button
          appearance="ghost"
          style={{
            paddingHorizontal: 0,
            marginHorizontal: 0,
          }}
          status="danger"
          accessoryLeft={BackIcon}
          onPress={() => {
            navigation.navigate('PeopleScreen');
          }}
        />
      )}
      accessoryRight={() => (
        <Button
          onPress={() => {
            navigation.navigate('AddIdeaScreen', {personId: person.id});
          }}
          appearance="ghost"
          status="info"
          accessoryLeft={AddIcon}
        />
      )}
    />
  );
}

export default IdeaScreen;

function ModalImage({
  modalVisible = false,
  setModalVisible,
  selectedImage,
  giftName,
  theme,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      presentationStyle="overFullScreen"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <BlurView intensity={35} tint={theme} style={styles.blurContainer}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: 45,
            paddingBottom: 45,
            flex: 1,
          }}
        >
          <Text style={styles.modalText}>{giftName}</Text>
          <Image
            role="img"
            alt=""
            source={{uri: selectedImage}}
            style={{
              width: '100%',
              height: 450,
              resizeMode: 'contain',
            }}
          />
          <Button onPress={() => setModalVisible(!modalVisible)}>Close</Button>
        </View>
      </BlurView>
    </Modal>
  );
}

function EmptyGifs({navigation, person}) {
  return (
    <View style={styles.emptyBody}>
      <View style={styles.emptyBox}>
        <Text category="h2">No gifts saved.</Text>
        <Text category="s1">Add a idea to get started.</Text>
        <View>
          <AnimationPlayer
            animation={Animations.sad}
            autoPlay={true}
            loop={false}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate('AddIdeaScreen', {personId: person.id});
          }}
          style={styles.button}
        >
          Add idea
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinnerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  controlContainer: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#3366FF',
  },
  logo: {
    marginRight: 16,
    paddingRight: 10,
  },

  name: {
    fontSize: 21,
  },

  emptyBox: {
    alignItems: 'center',
    marginTop: -65,
  },
  emptyBody: {
    justifyContent: 'center',
    height: '90%',
  },

  blurContainer: {
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },

  button: {
    marginTop: 20,
  },

  modalText: {
    textAlign: 'center',
    fontSize: 30,
  },
});
