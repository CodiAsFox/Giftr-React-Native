import React, {useContext, useEffect, useState} from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {DataContext} from '../Utils/DataProvider';

import {ThemeContext} from '../Utils/ThemeProvider';
import AnimationPlayer from '../Components/AnimationPlayer';
import PersonList from '../Components/Lists/PeopleList';
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
            animation={Animations.welcome}
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
  const {toggleTheme} = useContext(ThemeContext);
  const {theme} = useContext(ThemeContext);
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
            ) : sortedPeople.length >= 1 ? (
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
  emptyBox: {
    alignItems: 'center',
    marginTop: -65,
  },
  emptyBody: {
    justifyContent: 'center',
    height: '90%',
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
});
