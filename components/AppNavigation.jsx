import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PeopleScreen from '../Screens/PeopleScreen';
import IdeaScreen from '../Screens/IdeaScreen';
import AddIdeaScreen from '../Screens/Forms/AddIdeaScreen';

import AddPersonScreen from '../Screens/Forms/AddPersonScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export default function AppNavigation() {
  const os = Platform.OS;

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
            presentation: os == 'ios' ? 'modal' : 'card',
          })}
        />
        <Screen name="IdeaScreen" component={IdeaScreen} />
        <Screen
          name="AddIdeaScreen"
          component={AddIdeaScreen}
          options={() => ({
            presentation: os == 'ios' ? 'modal' : 'card',
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
}
