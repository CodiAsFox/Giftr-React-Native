import React, {useContext, useEffect, useState} from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, View, StatusBar, StyleSheet} from 'react-native';
import {DataContext} from '../Utils/DataProvider';

import {ThemeContext} from '../Utils/ThemeProvider';
import AnimationPlayer from '../Components/AnimationPlayer';
import PersonList from '../Components/Person/ListComponent';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  Button,
  Spinner,
} from '@ui-kitten/components';
import {Animations} from '../assets/Assets';

function EmptyPeople({navigation}) {
  return (
    <View style={styles.emptyBody}>
      <View style={styles.emptyBox}>
        <Text category="h2">No people saved.</Text>
        <Text category="s1">Add a person to get started.</Text>
        <View>
          <AnimationPlayer
            animation={Animations.sad}
            autoPlay={true}
            loop={false}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate('AddPersonScreen');
          }}
          style={styles.button}
        >
          Add person
        </Button>
      </View>
    </View>
  );
}

function HomeHeader({navigation}) {
  const {toggleTheme} = React.useContext(ThemeContext);
  const {theme} = React.useContext(ThemeContext);
  const os = Platform.OS;

  const SwitchTheme = () => {
    const LightIcon = (props) => <Icon {...props} name="sun-outline" />;
    const DarkIcon = (props) => <Icon {...props} name="moon-outline" />;
    return (
      <Button
        onPress={toggleTheme}
        appearance="ghost"
        status="danger"
        accessoryLeft={theme == 'light' ? DarkIcon : LightIcon}
      />
    );
  };

  const AddIcon = (props) => <Icon {...props} name="person-add-outline" />;
  const AddPerson = (
    <Button
      onPress={() => {
        navigation.navigate('AddPersonScreen');
      }}
      appearance="ghost"
      status="info"
      accessoryLeft={AddIcon}
    />
  );

  const renderTitle = (props) => (
    <View style={styles.titleContainer}>
      {/* <Avatar style={styles.logo} source={require('../assets/user.png')} /> */}
      <Text {...props}>Home</Text>
    </View>
  );

  return (
    <TopNavigation
      title={renderTitle}
      alignment="center"
      accessoryRight={os == 'android' ? SwitchTheme : AddPerson}
      accessoryLeft={os == 'ios' ? SwitchTheme : <></>}
    />
  );
}

function PeopleScreen({navigation}) {
  const {people, isLoading} = useContext(DataContext);
  const [sortedPeople, setSortedPeople] = useState([]);

  const {theme} = React.useContext(ThemeContext);

  useEffect(() => {
    const stPeople = people.sort((a, b) => {
      return new Date(a.dob) - new Date(b.dob);
    });
    setSortedPeople(stPeople);
  }, [people]);

  return (
    <Layout style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <HomeHeader navigation={navigation} />
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
            ) : sortedPeople.length > 1 ? (
              <PersonList sortedPeople={sortedPeople} navigation={navigation} />
            ) : (
              <EmptyPeople navigation={navigation} />
            )}
          </Layout>
        </GestureHandlerRootView>
      </SafeAreaView>
    </Layout>
  );
}
export default PeopleScreen;

const styles = StyleSheet.create({
  ststusBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  container: {
    // flex: 1,
  },
  swipeable: {alignItems: 'center', flex: 1, width: '100%'},
  emptyBox: {
    alignItems: 'center',
    marginTop: -65,
  },
  emptyBody: {
    justifyContent: 'center',
    height: '90%',
  },
  banner: {
    left: 0,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 30,
    position: 'absolute',
  },
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
    marginHorizontal: 16,
  },
  itemImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 21,
  },
  dob: {
    width: 15,
    height: 15,
    top: 2,
    marginRight: 2,
  },
  dobText: {
    marginTop: 5,
    fontSize: 13,
  },
});
