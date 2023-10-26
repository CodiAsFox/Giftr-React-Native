// import {GluestackUIProvider} from '@gluestack-ui/themed';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {DataProvider} from './Utils/DataProvider';
import PeopleScreen from '../Screens/PeopleScreen';

import {BlurView} from 'expo-blur';
// import {config} from '@gluestack-ui/config';
// import IdeaScreen from '../Screens/IdeaScreen';
// import AddIdeaScreen from '../Screens/Forms/AddIdeaScreen';

// import BackButton from './Components/BackButton';
import AddPersonScreen from '../Screens/Forms/AddPersonScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export default function AppNavigation() {
  const os = Platform.OS;

  const options = {
    ios: {},
    android: {
      presentation: 'card',
    },
  };

  const navBar = {
    ios: {
      // headerRight: () => <></>,
      // headerLeft: () => <BackButton />,
    },
    android: {
      // headerRight: () => <BackButton />,
      // headerLeft: () => <></>,
    },
  };

  const screenProps = options[os];
  const navProps = navBar[os];

  return (
    <NavigationContainer style={{flex: 1}}>
      <Navigator
        screenOptions={{headerShown: false, bodyBackgroundColor: 'transparent'}}
      >
        <Screen name="PeopleScreen" component={PeopleScreen} />
        <Screen
          name="AddPersonScreen"
          component={AddPersonScreen}
          options={() => ({
            ...screenProps,
            presentation: os == 'ios' ? 'modal' : 'card',
            ...navProps,
          })}
        />
        {/* <Screen
          name="IdeaScreen"
          component={IdeaScreen}
          options={screenProps}
        />
        <Screen
          name="AddIdeaScreen"
          component={AddIdeaScreen}
          options={() => ({
            ...screenProps,
            presentation: os == 'ios' ? 'modal' : 'card',
            ...navProps,
          })}
        /> */}
      </Navigator>
    </NavigationContainer>
  );
}
